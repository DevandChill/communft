import interact from "interactjs";

const DraggableBox = ({ children, title, className, width, height }) => {
  return (
    <div className={``}>
      <TitleBar>{title}</TitleBar>
      <div
        className={`overflow-y-auto overflow-x-hidden ${className} ${width} ${height}`}
      >
        {children}
      </div>
    </div>
  );
};

export default DraggableBox;

function TitleBar({ className = "", barWidth, children, ...rest }) {
  return (
    <div
      className={`titlebar draggable h-6 bg-gray-300 px-2 text-gray-700 font-bold uppercase`}
      {...rest}
    >
      {children}
      <div style={{ float: "right", marginRight: "0px" }}>
        <p className="exit-icon">X</p>
      </div>
    </div>
  );
}

const dragMoveListener = (event) => {
  var target = event.target.parentElement;
  if (!event.target.classList.contains("titlebar")) {
    console.log(event.target.classList);
    return;
  }
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform = target.style.transform =
    "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
};

interact(".draggable").draggable({
  inertia: true,
  modifiers: [
    interact.modifiers.restrictRect({
      //   restriction: "#design-container",
      endOnly: true,
    }),
  ],
  autoScroll: false,
  // dragMoveListener from the dragging demo above
  onmove: dragMoveListener,
});
