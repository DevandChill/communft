import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CustomSwitch = ({ value, labelFalse, labelTrue, onChange }) => {
  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch.Label as="span" className="ml-3">
        <span className="pr-4 text-sm font-medium text-gray-700 uppercase">
          {labelFalse}
        </span>
      </Switch.Label>
      <Switch
        checked={value}
        onChange={(val) => onChange(val)}
        className={classNames(
          value ? "bg-primary-100" : "bg-gray-400",
          "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            value ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3">
        <span className="text-sm font-medium text-gray-700 uppercase">
          {labelTrue}
        </span>
      </Switch.Label>
    </Switch.Group>
  );
};

export default CustomSwitch;
