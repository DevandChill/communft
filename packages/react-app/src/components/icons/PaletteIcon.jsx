const PaletteIcon = ({ size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 20 20"
      enableBackground="new 0 0 20 20"
    >
      <path d="M9 20v-1.7l0.010-0.24 6.060-6.060h2.94c1.1 0 1.99 0.89 1.99 2v4c0 1.105-0.895 2-2 2v0h-9zM9 16.66v-11.32l2.080-2.070c0.36-0.362 0.859-0.586 1.41-0.586s1.050 0.224 1.41 0.586l2.83 2.83c0.359 0.362 0.582 0.86 0.582 1.41s-0.222 1.048-0.582 1.41l0-0-7.73 7.74zM0 1.99c0-1.090 0.89-1.99 2-1.99h4c1.105 0 2 0.895 2 2v0 16c0 1.105-0.895 2-2 2v0h-4c-1.105 0-2-0.895-2-2v0-16zM4 17c0.552 0 1-0.448 1-1s-0.448-1-1-1v0c-0.552 0-1 0.448-1 1s0.448 1 1 1v0z"></path>
    </svg>
  );
};

export default PaletteIcon;
