import Undernet from "../src/index"

// This is the starting DOM.
// It is assigned to document.body.innerHTML before each test suite.
const dom = `
  <div data-dropdown="dropdown1" class="dropdown">
    <button id="dropdown-button" data-parent="dropdown1" data-target="new-dropdown">Open Dropdown</button>
    <ul id="new-dropdown" class="dropdown-menu">
      <li><a href="#">Item 1</a></li>
      <li><a href="#">Item 2</a></li>
      <li><a href="#">Item 3</a></li>
    </ul>
  </div>
  <div data-dropdown="dropdown2" class="dropdown">
    <button id="dropdown-button2" data-parent="dropdown2" data-target="new-dropdown2">Open Dropdown 2</button>
    <ul id="new-dropdown2" class="dropdown-menu">
      <li><a href="#">Item 1</a></li>
    </ul>
  </div>
`

describe("Dropdowns", function() {
  describe("API start", function() {
    let button
    let menu

    beforeAll(function() {
      document.body.innerHTML = dom
      button = document.querySelector("#dropdown-button")
      menu = document.querySelector("#new-dropdown")
      Undernet.Dropdowns.start()
    })

    it("sets [aria-controls] on button equal to menu id", function() {
      expect(button.getAttribute("aria-controls")).toEqual(menu.id)
    })

    it("sets [aria-haspopup='true'] on button", function() {
      expect(button.getAttribute("aria-haspopup")).toEqual("true")
    })

    it("sets [aria-expanded='false'] on button", function() {
      expect(button.getAttribute("aria-expanded")).toEqual("false")
    })

    it("sets [aria-labelledby] on menu equal to button id", function() {
      expect(menu.getAttribute("aria-labelledby")).toEqual(button.id)
    })
  })

  describe("API stop -> Dropdown Button Click", function() {
    let button
    let dropdownWrapper

    beforeAll(function() {
      document.body.innerHTML = dom
      button = document.querySelector("#dropdown-button")
      dropdownWrapper = document.querySelector("[data-dropdown='dropdown1']")
      Undernet.Dropdowns.start()
      Undernet.Dropdowns.stop()
      button.click()
    })

    it("sets [aria-expanded='false'] on button", function() {
      expect(button.getAttribute("aria-expanded")).toEqual("false")
    })

    it("does not set [data-visible] on dropdown wrapper", function() {
      expect(dropdownWrapper.getAttribute("data-visible")).toEqual(null)
    })
  })

  describe("#render -> Dropdown Button Click", function() {
    let button
    let dropdownWrapper
    let focusableElements

    beforeAll(function() {
      document.body.innerHTML = dom
      button = document.querySelector("#dropdown-button")
      dropdownWrapper = document.querySelector("[data-dropdown='dropdown1']")
      focusableElements = document.querySelectorAll("#new-dropdown a")
      Undernet.Dropdowns.start()
      button.click()
    })

    it("sets [aria-expanded='true'] on button", function() {
      expect(button.getAttribute("aria-expanded")).toEqual("true")
    })

    it("sets [data-visible='true'] on dropdown wrapper", function() {
      expect(dropdownWrapper.getAttribute("data-visible")).toEqual("true")
    })

    it("sets [tabindex='0'] on each dropdown menu link", function() {
      focusableElements.forEach(item => {
        expect(item.getAttribute("tabindex")).toEqual("0")
      })
    })

    it("sets focus to the first dropdown link", function() {
      expect(document.activeElement).toEqual(focusableElements[0])
    })
  })

  describe("#renderWithKeys -> Arrow Down or Up Key Press", function() {
    let button
    let dropdownWrapper
    let focusableElements
    let firstDropdownItem
    let lastDropdownItem

    beforeEach(function() {
      document.body.innerHTML = dom

      button = document.getElementById("dropdown-button")
      dropdownWrapper = document.querySelector("[data-dropdown='dropdown1']")
      focusableElements = document.querySelectorAll("#new-dropdown a")
      firstDropdownItem = focusableElements[0]
      lastDropdownItem = focusableElements[focusableElements.length - 1]

      Undernet.Dropdowns.stop()
      Undernet.Dropdowns.start()
    })

    it("sets [data-visible='true'] on dropdown wrapper", function() {
      window.simulateKeyPress(40, false, button)
      expect(dropdownWrapper.getAttribute("data-visible")).toEqual("true")
    })

    it("sets [data-visible='true'] on dropdown wrapper", function() {
      window.simulateKeyPress(38, false, button)
      expect(dropdownWrapper.getAttribute("data-visible")).toEqual("true")
    })

    it("sets focus to first item in dropdown menu when arrow down key is pressed", function() {
      window.simulateKeyPress(40, false, button)
      expect(document.activeElement).toEqual(firstDropdownItem)
    })

    it("sets focus to first item in dropdown menu when arrow down key is pressed", function() {
      window.simulateKeyPress(38, false, button)
      expect(document.activeElement).toEqual(lastDropdownItem)
    })
  })

  describe("#handleFirstTabClose & #handleLastTabClose", function() {
    let button
    let dropdownWrapper
    let firstDropdownItem
    let lastDropdownItem

    beforeEach(function() {
      document.body.innerHTML = dom

      button = document.getElementById("dropdown-button")
      dropdownWrapper = document.querySelector("[data-dropdown='dropdown1']")
      firstDropdownItem = document.querySelectorAll("#new-dropdown a")[0]
      lastDropdownItem = document.querySelectorAll("#new-dropdown a")[2]

      Undernet.Dropdowns.start()
      button.click()
    })

    it("sets [data-vislble='false'] on dropdown wrapper if shift + tab key is pressed in open menu", function() {
      window.simulateKeyPress(9, true, firstDropdownItem)
      expect(dropdownWrapper.getAttribute("data-visible")).toEqual("false")
    })

    it("sets [data-visible='false'] on dropdown wrapper if tab key is pressed in open menu", function() {
      window.simulateKeyPress(9, false, lastDropdownItem)
      expect(dropdownWrapper.getAttribute("data-visible")).toEqual("false")
    })
  })

  describe("#handleClose -> Dropdown Menu Link Click", function() {
    let button
    let dropdownWrapper
    let focusableElements

    beforeAll(function() {
      document.body.innerHTML = dom

      button = document.getElementById("dropdown-button")
      dropdownWrapper = document.querySelector("[data-dropdown='dropdown1']")
      focusableElements = document.querySelectorAll("#new-dropdown a")

      Undernet.Dropdowns.start()
      button.click()
      focusableElements[0].click()
    })

    it("sets [data-visible='false'] on dropdown wrapper", function() {
      expect(dropdownWrapper.getAttribute("data-visible")).toEqual("false")
    })

    it("sets [aria-expanded='false'] on dropdown button", function() {
      expect(button.getAttribute("aria-expanded")).toEqual("false")
    })

    it("sets [tabindex='-1'] on each dropdown menu link", function() {
      focusableElements.forEach(item => {
        expect(item.getAttribute("tabindex")).toEqual("-1")
      })
    })

    it("sets focus back to dropdown button", function() {
      expect(document.activeElement).toEqual(button)
    })
  })

  describe("#handleEscapeKeyPress -> Escape Key Press", function() {
    let button
    let dropdownWrapper

    beforeAll(function() {
      document.body.innerHTML = dom
      button = document.querySelector("#dropdown-button")
      dropdownWrapper = document.querySelector("[data-dropdown='dropdown1']")
      Undernet.Dropdowns.start()
      button.click()
      window.simulateKeyPress(27)
    })

    it("sets [data-visible='false'] on dropdown wrapper", function() {
      expect(dropdownWrapper.getAttribute("data-visible")).toEqual("false")
    })
  })

  describe("#handleOffMenuClick -> Non-Dropdown Close Click", function() {
    let button
    let dropdownWrapper

    beforeAll(function() {
      document.body.innerHTML = dom
      button = document.querySelector("#dropdown-button")
      dropdownWrapper = document.querySelector("[data-dropdown='dropdown1']")
      Undernet.Dropdowns.start()
      button.click()
      document.body.click()
    })

    it("sets [data-visible='false'] on dropdown wrapper", function() {
      expect(dropdownWrapper.getAttribute("data-visible")).toEqual("false")
    })
  })

  describe("#handleReturnFocus -> Dropdown Close Click", function() {
    let button

    beforeAll(function() {
      document.body.innerHTML = dom
      button = document.querySelector("#dropdown-button")
      Undernet.Dropdowns.start()
      button.click()
      window.simulateKeyPress(27)
    })

    it("sets focus to dropdown button after dropdown menu is closed", function() {
      expect(document.activeElement).toEqual(button)
    })
  })

  describe("Multiple Dropdowns", function() {
    let button1
    let button2
    let dropdownWrapper1
    let dropdownWrapper2

    beforeAll(function() {
      document.body.innerHTML = dom
      button1 = document.querySelector("#dropdown-button")
      button2 = document.querySelector("#dropdown-button2")
      dropdownWrapper1 = document.querySelector("[data-dropdown='dropdown1']")
      dropdownWrapper2 = document.querySelector("[data-dropdown='dropdown2']")
      Undernet.Dropdowns.start()
    })

    it("closes first dropdown if second dropdown is clicked", function() {
      button1.click()
      expect(dropdownWrapper1.getAttribute("data-visible")).toEqual("true")
      expect(dropdownWrapper2.getAttribute("data-visible")).toEqual(null)
      button2.click()
      expect(dropdownWrapper1.getAttribute("data-visible")).toEqual("false")
      expect(dropdownWrapper2.getAttribute("data-visible")).toEqual("true")
    })

    it("sets focus to first dropdown item of second dropdown", function() {
      const dropdown2Focusables = dropdownWrapper2.querySelectorAll("a")
      button1.click()
      button2.click()
      expect(document.activeElement).toEqual(dropdown2Focusables[0])
    })
  })

  describe("Errors", function() {})
})
