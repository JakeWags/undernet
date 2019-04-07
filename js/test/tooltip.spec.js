import Undernet from "../src/index"

// This is the starting DOM.
// It is assigned to document.body.innerHTML before each test suite.
const dom = `
  <span class="tooltip" data-tooltip="new-tooltip">
    <button class="tooltip-trigger" data-target="new-tooltip">Tooltip Button</button>
    <div class="tooltip-box" id="new-tooltip">
      This is a tooltip.
    </div>
  </span>
  <span class="tooltip" data-tooltip="new-tooltip10">
    <button class="tooltip-trigger" data-target="new-tooltip10">Tooltip Button</button>
    <div class="tooltip-box" id="new-tooltip10">
      <em>This</em> <b>is a</b> <u>tooltip</u>.
    </div>
  </span>
`

describe("Tooltips", () => {
  const tooltipId1 = "new-tooltip"
  const tooltipId2 = "new-tooltip10"

  describe("API start", () => {
    let trigger
    let tooltip

    beforeAll(() => {
      document.body.innerHTML = dom
      trigger = document.querySelector(`[data-target='${tooltipId1}']`)
      tooltip = document.getElementById(tooltipId1)
      Undernet.Tooltips.start()
    })

    it("sets [aria-describedby] on tooltip trigger", () => {
      expect(trigger.getAttribute("aria-describedby")).toEqual(tooltipId1)
    })

    it("sets [role] on tooltip", () => {
      expect(tooltip.getAttribute("role")).toEqual("tooltip")
    })
  })

  describe("API stop -> Tooltip Focus/MouseOver", () => {
    let trigger
    let tooltip

    beforeAll(() => {
      document.body.innerHTML = dom
      trigger = document.querySelector(`[data-target='${tooltipId1}']`)
      tooltip = document.getElementById(tooltipId1)
      Undernet.Tooltips.start()
      Undernet.Tooltips.stop()
    })

    it("does not set [data-visible='true'] on tooltip when trigger is focused", () => {
      trigger.focus()
      expect(tooltip.getAttribute("data-visible")).toEqual(null)
    })

    it("does not set [data-visible='true'] on tooltip when mouse moves over trigger", () => {
      global.simulateMouseEvent("mouseover", trigger, true, true)
      expect(tooltip.getAttribute("data-visible")).toEqual(null)
    })
  })

  describe("#render -> Tooltip Focus/MouseOver", () => {
    let trigger
    let tooltip

    beforeAll(() => {
      document.body.innerHTML = dom
      trigger = document.querySelector(`[data-target='${tooltipId1}']`)
      tooltip = document.getElementById(tooltipId1)
      Undernet.Tooltips.start()
    })

    it("sets [data-visible='true'] on tooltip when trigger is focused", () => {
      trigger.focus()
      expect(tooltip.getAttribute("data-visible")).toEqual("true")
    })

    it("sets [data-visible='true'] on tooltip when mouse moves over trigger", () => {
      global.simulateMouseEvent("mouseover", trigger, true, true)
      expect(tooltip.getAttribute("data-visible")).toEqual("true")
    })
  })

  describe("#handleClose -> Tooltip Blur/MouseOut", () => {
    let trigger1
    let trigger2
    let tooltip1
    let tooltip2

    beforeAll(() => {
      document.body.innerHTML
      trigger1 = document.querySelector(`[data-target='${tooltipId1}']`)
      trigger2 = document.querySelector(`[data-target='${tooltipId2}']`)
      tooltip1 = document.getElementById(tooltipId1)
      tooltip2 = document.getElementById(tooltipId2)
      Undernet.start()
    })

    it("hides previous tooltip if another is focused", () => {
      trigger1.focus()
      expect(tooltip1.getAttribute("data-visible")).toEqual("true")
      trigger2.focus()
      expect(tooltip1.getAttribute("data-visible")).toEqual("false")
      expect(tooltip2.getAttribute("data-visible")).toEqual("true")
    })

    it("hides tooltip on mouseout event", () => {
      global.simulateMouseEvent("mouseover", trigger1, true, true)
      expect(tooltip1.getAttribute("data-visible")).toEqual("true")
      global.simulateMouseEvent("mouseout", trigger1, true, true)
      expect(tooltip1.getAttribute("data-visible")).toEqual("false")
    })
  })

  describe("Errors", () => {})
})