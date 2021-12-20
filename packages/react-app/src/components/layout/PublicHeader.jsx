import { Link } from "react-router-dom";
import { signInWithWeb3 } from "@/utils/login/index.ts";
import { Logo } from "@/components/logo";
import firebaseApp from "@/services/firebase";
import { getAuth, signOut } from "firebase/auth";
import { selectCurrentUser, setSignOut } from "@/store/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Fragment } from "react";
import { ethers } from "ethers";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon, LockClosedIcon } from "@heroicons/react/outline";
import Davatar from "@davatar/react";

const auth = getAuth();

const navItems = [
  {
    name: "Explore",
    link: "/explore",
  },
  {
    name: "Create",
    link: "/app/create",
  },
];

const profileMenu = [
  {
    name: "Profile",
    link: "/app/profile",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PublicHeader = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const handleLogin = () => {
    signInWithWeb3(firebaseApp);
  };
  const handleLogout = () => {
    signOut(auth);
    dispatch(setSignOut());
  };
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="m-4">
                  <Link to="/">
                    <Logo />
                  </Link>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <div className="hidden sm:mr-6 sm:flex sm:space-x-8">
                  {navItems.map(({ name, link }, index) => (
                    <Link
                      key={index}
                      to={`${link.toLowerCase()}`}
                      className="border-transparent text-gray-500  hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-xl font-bold"
                    >
                      {name}
                    </Link>
                  ))}
                </div>
                {/* Profile dropdown */}
                {currentUser.uid ? (
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none">
                        <Davatar
                          size={36}
                          provider={provider}
                          address={currentUser.uid}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg  bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {profileMenu.map(({ name, link }, index) => (
                          <Menu.Item key={index}>
                            {({ active }) => (
                              <Link
                                to={`${link.toLowerCase()}`}
                                className={classNames(
                                  active ? "text-gray-900 shadow-lg" : "",
                                  "block px-4 py-2 text-sm text-gray-700 font-semibold border"
                                )}
                              >
                                {name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              onClick={handleLogout}
                              className={classNames(
                                active ? "text-gray-900 shadow-lg" : "",
                                "block px-4 py-2 text-sm text-gray-700 font-semibold border cursor-pointer"
                              )}
                            >
                              Sign Out
                            </div>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div>
                    <button
                      onClick={handleLogin}
                      className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                      <LockClosedIcon
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                )}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map(({ name, link }, index) => (
                <Link
                  key={index}
                  to={`${link.toLowerCase()}`}
                  className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4"
                >
                  <Disclosure.Button className="font-semibold">
                    {name}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
            {currentUser.uid ? (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <Davatar
                      size={36}
                      provider={provider}
                      address={currentUser.uid}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      name
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      description
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  {profileMenu.map(({ name, link }, index) => (
                    <Link
                      key={index}
                      to={`${link.toLowerCase()}`}
                      className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4"
                    >
                      <Disclosure.Button className="font-semibold">
                        {name}
                      </Disclosure.Button>
                    </Link>
                  ))}
                  <button
                    onClick={async () => {
                      handleLogout();
                    }}
                    className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 font-semibold"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <button
                  onClick={async () => {
                    handleLogin();
                  }}
                  className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 font-semibold"
                >
                  Sign In
                </button>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default PublicHeader;
