"use client";
import * as React from "react";
import "./styles.scss";
import Link from "next/link";
import { useAppContext } from "@/context";
import Image from "next/image";
import { cart, heart, search, user as userIcon } from "@/public/assets/icons";
import { clsx } from "clsx";
import InputSingle from "@/components/common/InputSingle";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const { user, loginUser, logoutUser } = useAppContext();
  const products = [
    {
      name: "Analytics",
      description: "Get a better understanding of your traffic",
      href: "#",
      icon: ChartPieIcon,
    },
    {
      name: "Engagement",
      description: "Speak directly to your customers",
      href: "#",
      icon: CursorArrowRaysIcon,
    },
    {
      name: "Security",
      description: "Your customers’ data will be safe and secure",
      href: "#",
      icon: FingerPrintIcon,
    },
    {
      name: "Integrations",
      description: "Connect with third-party tools",
      href: "#",
      icon: SquaresPlusIcon,
    },
    {
      name: "Automations",
      description: "Build strategic funnels that will convert",
      href: "#",
      icon: ArrowPathIcon,
    },
  ];
  const callsToAction = [
    { name: "Watch demo", href: "#", icon: PlayCircleIcon },
    { name: "Contact sales", href: "#", icon: PhoneIcon },
  ];
  const usersNav = [
    {
      name: "Login",
      href: "/login",
      icon: ChartPieIcon,
    },
    {
      name: "Signup",
      href: "/signup",
      icon: ChartPieIcon,
    },
    {
      name: "My order",
      href: "/user/order",
      icon: ChartPieIcon,
    },
    {
      name: "Info",
      href: "/user/info",
      icon: ChartPieIcon,
    },
    {
      name: "Logout",
      icon: ChartPieIcon,
      function: function () {
        console.log("logout");
        logoutUser();
      },
    },
  ];
  const userNavAuth = user?.isAuth ? usersNav : usersNav.slice(0, -3);
  const isActive = (path: string) => {
    return clsx({
      underline: window.location.pathname === path,
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // search here
    console.log(event.target.value);
  };

  return (
    <div className="header">
      <div className="promotion">
        <span>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        </span>
        <Link href={"/"} className="ml-2 font-semibold underline">
          Shop Now
        </Link>
      </div>

      <div className="navbar">
        <Link className="logo" href={"/"}>Exclusive</Link>
        {/* <div className="nav-list">
          <Link href={"/"}>Home</Link>
          <Link href={"/dashboard"}>Dashboard</Link>
          <Link href={"/"}>About</Link>
          <Link href={"/"}>Contact</Link>
        </div> */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Product
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </PopoverButton>

            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon
                        className="h-5 w-5 flex-none text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>

          <Link href="/dashboard" className="text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </Link>
          <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
            About
          </Link>
          <Link href="company" className="text-sm font-semibold leading-6 text-gray-900">
            Company
          </Link>
        </PopoverGroup>
        <div className="nav-act">
          <InputSingle
            icon={
              <Image
                className="icon-act m-"
                src={search}
                width={24}
                height={24}
                alt="search_prod"
              />
            }
            placeholder="What are you looking for?"
            onChange={onChange}
          />
          <Image
            className="icon-act"
            src={heart}
            width={24}
            height={24}
            alt="fav_prod"
          />
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              {user?.isAuth ? (
                <span>{user.userName}</span>
              ) : (
                <Image
                  className="icon-act"
                  src={userIcon}
                  width={32}
                  height={32}
                  alt="user"
                />
              )}
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </PopoverButton>

            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {userNavAuth.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          onClick={item.function}
                          className="block font-semibold text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Header;
