import Undernet from "../src/index"

// This is the starting DOM.
// It is assigned to document.body.innerHTML before each test suite.
const dom = `
  <button href="#" data-modal-button="new-modal">Open modal</button>

  <div className="modal-overlay" data-modal="new-modal">
    <div className="modal-dialog" data-parent="new-modal" aria-labelledby="header-id">
      <header>
        <h2 className="h6 has-no-margin-top" id="header-id">
          Modal Header
        </h2>
        <a data-close href="#">
          <span aria-hidden="true">&times;</span>
        </a>
      </header>
      <section>
        <p>Some modal content here</p>
      </section>
      <footer>
        <a className="button" data-close href="#">
          Cancel
        </a>
        <a className="primary button" href="#">
          OK
        </a>
      </footer>
    </div>
  </div>
`

// Begin modal tests.

describe("Modals", function() {
  describe("API start", function() {
    let modalDialog
    let modalOverlay

    beforeAll(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      modalDialog = document.querySelector("[data-parent]")
      modalOverlay = document.querySelector("[data-modal]")
    })

    it("has no [tabindex] on modal dialog", function() {
      expect(modalDialog.getAttribute("tabindex")).toEqual(null)
    })

    it("sets [data-visible='false'] on modal overlay", function() {
      expect(modalOverlay.getAttribute("data-visible")).toEqual("false")
    })

    it("sets [aria-hidden='true'] on modal overlay", function() {
      expect(modalOverlay.getAttribute("aria-hidden")).toEqual("true")
    })

    it("sets [tabindex='-1'] on each focusable element", function() {
      const focusableElements = modalDialog.querySelectorAll("a")
      focusableElements.forEach(el => {
        expect(el.getAttribute("tabindex")).toEqual("-1")
      })
    })

    it("sets [role='dialog'] to modal dialog", function() {
      expect(modalDialog.getAttribute("role")).toEqual("dialog")
    })

    it("sets [aria-modal='true'] to modal dialog", function() {
      expect(modalDialog.getAttribute("aria-modal")).toEqual("true")
    })

    it("sets [aria-labelledby] on modal dialog equal to header id", function() {
      const header = document.querySelector("h2")
      expect(modalDialog.getAttribute("aria-labelledby")).toEqual(header.id)
    })
  })

  describe("API stop -> Modal Button Click", function() {
    let button
    let modalOverlay
    let modalDialog

    beforeAll(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      Undernet.Modals.stop()
      button = document.querySelector("[data-modal-button]")
      modalOverlay = document.querySelector("[data-modal]")
      modalDialog = document.querySelector("[data-parent]")
      button.click()
    })

    it("has [data-visible='false'] on modal overlay", function() {
      expect(modalOverlay.getAttribute("data-visible")).toEqual("false")
    })

    it("does not set [tabindex] on modal dialog", function() {
      expect(modalDialog.getAttribute("tabindex")).toEqual(null)
    })
  })

  describe("#render -> Modal Button Click", function() {
    let button
    let modalOverlay
    let modalDialog

    beforeAll(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      button = document.querySelector("[data-modal-button]")
      modalDialog = document.querySelector("[data-parent]")
      modalOverlay = document.querySelector("[data-modal]")
      button.click()
    })

    it("sets [tabindex='-1'] on modal dialog", function() {
      expect(modalDialog.getAttribute("tabindex")).toEqual("-1")
    })

    it("sets [data-visible='true'] on modal overlay", function() {
      expect(modalOverlay.getAttribute("data-visible")).toEqual("true")
    })

    it("sets [aria-hidden='false'] on modal overlay", function() {
      expect(modalOverlay.getAttribute("aria-hidden")).toEqual("false")
    })

    it("sets [tabindex='0'] on each focusable element", function() {
      const focusableElements = modalDialog.querySelectorAll("a")
      focusableElements.forEach(el => {
        expect(el.getAttribute("tabindex")).toEqual("0")
      })
    })

    it("sets focus to [data-parent]", function() {
      expect(document.activeElement).toEqual(modalDialog)
    })
  })

  describe("#handleClose -> Modal Close Button Click", function() {
    let openButton
    let closeButton
    let modalOverlay
    let modalDialog

    beforeAll(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      openButton = document.querySelector("[data-modal-button]")
      closeButton = document.querySelector("[data-close]")
      modalOverlay = document.querySelector("[data-modal]")
      modalDialog = document.querySelector("[data-parent]")
      openButton.click()
      closeButton.click()
    })

    it("sets [data-visible='false'] on modal overlay", function() {
      expect(modalOverlay.getAttribute("data-visible")).toEqual("false")
    })

    it("removes [tabindex] on modal dialog", function() {
      expect(modalDialog.getAttribute("tabindex")).toEqual(null)
    })

    it("sets [aria-hidden='true'] on modal overlay", function() {
      expect(modalOverlay.getAttribute("aria-hidden")).toEqual("true")
    })

    it("sets [tabindex='-1'] on each focusable element", function() {
      const focusableElements = modalDialog.querySelectorAll("a")
      focusableElements.forEach(el => {
        expect(el.getAttribute("tabindex")).toEqual("-1")
      })
    })

    it("sets focus to [data-modal-button]", function() {
      expect(document.activeElement).toEqual(openButton)
    })
  })

  describe("#handleOverlayClick -> Modal Overlay Click", function() {
    let button
    let modalOverlay

    beforeAll(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      button = document.querySelector("[data-modal-button]")
      modalOverlay = document.querySelector("[data-modal]")
      button.click()
      modalOverlay.click()
    })

    it("sets [data-visible='false'] on modal overlay", function() {
      expect(modalOverlay.getAttribute("data-visible")).toEqual("false")
    })
  })

  describe("#handleEscapeKeyPress -> Escape Key Press", function() {
    let button
    let modalOverlay

    beforeAll(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      button = document.querySelector("[data-modal-button]")
      modalOverlay = document.querySelector("[data-modal]")
    })

    it("sets [data-visible='false'] on modal overlay", function() {
      button.click()
      window.simulateKeyPress(27)
      expect(modalOverlay.getAttribute("data-visible")).toEqual("false")
    })
  })

  describe("#handleReturnFocus -> Modal Close Button Click", function() {
    let openButton
    let closeButton

    beforeAll(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      openButton = document.querySelector("[data-modal-button]")
      closeButton = document.querySelector("[data-close]")
      openButton.click()
      closeButton.click()
    })

    it("sets focus back to [data-modal-button]", function() {
      expect(document.activeElement).toEqual(openButton)
    })
  })

  describe("#handleScrollRestore -> Modal Close Button Click", function() {
    let openButton
    let closeButton

    beforeAll(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      openButton = document.querySelector("[data-modal-button]")
      closeButton = document.querySelector("[data-close]")
      openButton.click()
      closeButton.click()
    })

    it("removes 'no-scroll' class from <body>", function() {
      expect(document.body.className).toEqual("")
    })
  })

  describe("#handleScrollStop -> Modal Button Click", function() {
    let button

    beforeAll(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      button = document.querySelector("[data-modal-button]")
      button.click()
    })

    it("sets 'no-scroll' class to <body>", function() {
      expect(document.body.className).toEqual("no-scroll")
    })
  })

  describe("Errors", function() {})
})
