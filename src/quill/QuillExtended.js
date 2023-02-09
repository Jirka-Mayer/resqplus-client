import Quill from "quill"
import { AppMode } from "../state/editor/AppMode"
import { allHighlightFormatNames, defineHighlightAttributors } from "./highlights/defineHighlightAttributors"
import { allAnonymizationNumbers, allHighlightNumbers } from "./ui/quillStyles"
import { DeltaMapper } from "./DeltaMapper"
import { IdToNumberAllocator } from "./utils/IdToNumberAllocator"
import { QuillStateRenderer } from "./ui/QuillStateRenderer"

// extend Quill with highlight attributors
defineHighlightAttributors()

/**
 * Works exactly like the Quill class with the same API, but encapsulates
 * the added functionality, such as highlihts and anonymization.
 * It should have the same API as Quill (if implemented) and then provide
 * some additional API for the extended logic.
 */
export class QuillExtended {
  /**
   * The class constructor is different than for Quill class, because this
   * extended class creates its own container element in order to bind
   * to DOM dynamically and play well with React. Also no options are needed.
   */
  constructor() {
    // one container element containing everything
    // the quill-instance element is inside
    this.containerElement = document.createElement("div")
    this.quillElement = document.createElement("div")
    this.containerElement.appendChild(this.quillElement)

    // create the inner quill instance
    this.quill = this._constructQuillInstance()

    // allocators
    this.annonymizationsAllocator = new IdToNumberAllocator(allAnonymizationNumbers)
    this.highlightsAllocator = new IdToNumberAllocator(allHighlightNumbers)

    // sets proper root CSS classes
    this.stateRenderer = new QuillStateRenderer(
      this.quillElement,
      this.containerElement,
      this.highlightsAllocator
    )

    // converts between in internal and exteral delta format
    this.deltaMapper = new DeltaMapper(
      this.highlightsAllocator,
      this.annonymizationsAllocator
    )
  }

  _constructQuillInstance() {
    this.quillElement.setAttribute("spellcheck", false)

    return new Quill(this.quillElement, {
      theme: false,
      modules: {
        toolbar: false
      },
      placeholder: "Paste discharge report here...",
      formats: [
        // inline
        "bold", "italic", "underline", "strike", "script",
        
        // block
        "header",
        
        // custom
        ...allHighlightFormatNames
      ]
    })
  }

  ///////////////
  // Rendering //
  ///////////////

  /**
   * Attaches the quill editor to a given parent element
   */
   attachTo(parentElement) {
    if (this.containerElement.parentElement === parentElement) {
      return // attached already
    }
    
    // detach from existing and attach here
    this.containerElement.remove()
    parentElement.appendChild(this.containerElement)
  }

  /**
   * Call this to update the DOM according to the active field
   */
  renderFieldActivity(activeFieldId) {
    this.stateRenderer.renderFieldActivity(activeFieldId)
  }

  /**
   * Call this to update the DOM according to the application mode
   */
  renderAppMode(appMode) {
    this.stateRenderer.renderAppMode(appMode)
    
    if (appMode === AppMode.EDIT_TEXT) {
      this.quill.enable(true)
    } else {
      this.quill.enable(false)
    }

    if (appMode === AppMode.ANNOTATE_HIGHLIGHTS) {
      // TODO: this.highlightManager.setIsAnnotating(true)
    } else {
      // TODO: this.highlightManager.setIsAnnotating(false)
    }
  }


  //////////////////////////
  // Translated Quill API //
  //////////////////////////

  // https://quilljs.com/docs/api/

  // Content //
  // ------- //

  // MISSING: deleteText

  getContents(index, length = undefined) {
    const internalDelta = this.quill.getContents(index, length)
    const externalDelta = this.deltaMapper.export(internalDelta)
    return externalDelta
  }

  getLength() {
    return this.quill.getLength()
  }

  getText(index, length = undefined) {
    return this.quill.getText(index, length)
  }

  // MISSING: insertEmbed

  // MISSING: insertText

  setContents(delta, source = "api") {
    // reset allocators
    this.annonymizationsAllocator.reset()
    this.highlightsAllocator.reset()

    // import content
    const internalDelta = this.deltaMapper.import(delta)
    this.quill.setContents(internalDelta, source)

    // re-render active highlight (due to the allocator reset)
    this.stateRenderer.refresh()
  }

  // MISSING: setText

  // MISSING: updateContents

  // Selection //
  // --------- //

  getBounds(index, length = 0) {
    return this.quill.getBounds(index, length)
  }

  getSelection(focus = false) {
    return this.quill.getSelection(focus)
  }

  setSelection(index, length = 0, source = "api") {
    return this.quill.setSelection(index, length, source)
  }

}