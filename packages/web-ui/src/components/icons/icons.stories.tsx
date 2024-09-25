import type { Meta, StoryObj } from "@storybook/react";
import { type ReactNode } from "react";
import { AddToCart } from "./add-to-cart";
import { Alert } from "./alert";
import { ArrowLeft } from "./arrow-left";
import { ArrowPathUp } from "./arrow-path-up";
import { ArrowRight } from "./arrow-right";
import { ArrowUp } from "./arrow-up";
import { ArrowUpRight } from "./arrow-up-right";
import { BarcodeScan } from "./barcode-scan";
import { Bell } from "./bell";
import { BookmarkFilled } from "./bookmark-filled";
import { BookmarkOutline } from "./bookmark-outline";
import { Building } from "./building";
import { Check } from "./check";
import { CheckCircle } from "./check-circle";
import { CheckCircleFilled } from "./check-circle-filled";
import { ChevronDown } from "./chevron-down";
import { ChevronLeft } from "./chevron-left";
import { ChevronRight } from "./chevron-right";
import { ChevronUp } from "./chevron-up";
import { Close } from "./close";
import { CloudDownload } from "./cloud-download";
import { Download } from "./download";
import { Email } from "./email";
import { Exit } from "./exit";
import { Facebook } from "./facebook";
import { FileDownload } from "./file-download";
import { Gear } from "./gear";
import { Headset } from "./headset";
import { HeartFilled } from "./heart-filled";
import { HeartOutline } from "./heart-outline";
import { Instagram } from "./instagram";
import { LinkedIn } from "./linkedin";
import { MagnifyingGlass } from "./magnifying-glass";
import { Map } from "./map";
import { MapPin } from "./map-pin";
import { Menu } from "./menu";
import { Minus } from "./minus";
import { PackageDelivery } from "./package-delivery";
import { Phone } from "./phone";
import { Pinterest } from "./pinterest";
import { Plus } from "./plus";
import { Printer } from "./printer";
import { Profile } from "./profile";
import { Receipt } from "./receipt";
import { Save } from "./save";
import { Settings } from "./settings";
import { Shield } from "./shield";
import { Shop } from "./shop";
import { ShoppingCart } from "./shopping-cart";
import { Switch } from "./switch";
import { Text } from "./text";
import { TikTok } from "./tiktok";
import { Timetable } from "./timetable";
import { Trash } from "./trash";
import { Truck } from "./truck";
import { TruckWithClock } from "./truck-with-clock";
import { Twitter } from "./twitter";
import { UserGroup } from "./user-group";
import { Wallet } from "./wallet";
import { YouTube } from "./youtube";
import { Zap } from "./zap";

const Icon = () => {
  return <svg />;
};

const meta: Meta<typeof Icon> = {
  title: "Components/Icons",
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

const IconContainer = ({
  name,
  children,
}: {
  readonly name: string;
  readonly children: ReactNode;
}) => {
  return (
    <li className="flex flex-col items-center">
      {children}{" "}
      <div className="text-center text-sm text-wurth-gray-800">{name}</div>
    </li>
  );
};

export const Showcase: Story = {
  render: () => {
    return (
      <ul className="grid grid-cols-6 gap-4">
        <IconContainer name="AddToCart">
          <AddToCart />
        </IconContainer>

        <IconContainer name="Alert">
          <Alert />
        </IconContainer>

        <IconContainer name="ArrowLeft">
          <ArrowLeft />
        </IconContainer>

        <IconContainer name="ArrowPathUp">
          <ArrowPathUp />
        </IconContainer>

        <IconContainer name="ArrowRight">
          <ArrowRight />
        </IconContainer>

        <IconContainer name="ArrowUp">
          <ArrowUp />
        </IconContainer>

        <IconContainer name="ArrowUpRight">
          <ArrowUpRight />
        </IconContainer>

        <IconContainer name="BarcodeScan">
          <BarcodeScan />
        </IconContainer>

        <IconContainer name="Bell">
          <Bell />
        </IconContainer>

        <IconContainer name="BookmarkFilled">
          <BookmarkFilled />
        </IconContainer>

        <IconContainer name="BookmarkOutline">
          <BookmarkOutline />
        </IconContainer>

        <IconContainer name="Building">
          <Building />
        </IconContainer>

        <IconContainer name="Check">
          <Check />
        </IconContainer>

        <IconContainer name="CheckCircle">
          <CheckCircle />
        </IconContainer>

        <IconContainer name="CheckCircleFilled">
          <CheckCircleFilled />
        </IconContainer>

        <IconContainer name="ChevronDown">
          <ChevronDown />
        </IconContainer>

        <IconContainer name="ChevronLeft">
          <ChevronLeft />
        </IconContainer>

        <IconContainer name="ChevronRight">
          <ChevronRight />
        </IconContainer>

        <IconContainer name="ChevronUp">
          <ChevronUp />
        </IconContainer>

        <IconContainer name="Close">
          <Close />
        </IconContainer>

        <IconContainer name="CloudDownload">
          <CloudDownload />
        </IconContainer>

        <IconContainer name="Download">
          <Download />
        </IconContainer>

        <IconContainer name="Email">
          <Email />
        </IconContainer>

        <IconContainer name="Exit">
          <Exit />
        </IconContainer>

        <IconContainer name="Facebook">
          <Facebook />
        </IconContainer>

        <IconContainer name="FileDownload">
          <FileDownload />
        </IconContainer>

        <IconContainer name="Gear">
          <Gear />
        </IconContainer>

        <IconContainer name="Headset">
          <Headset />
        </IconContainer>

        <IconContainer name="HeartFilled">
          <HeartFilled />
        </IconContainer>

        <IconContainer name="HeartOutline">
          <HeartOutline />
        </IconContainer>

        <IconContainer name="Instagram">
          <Instagram />
        </IconContainer>

        <IconContainer name="LinkedIn">
          <LinkedIn />
        </IconContainer>

        <IconContainer name="MagnifyingGlass">
          <MagnifyingGlass />
        </IconContainer>

        <IconContainer name="Map">
          <Map />
        </IconContainer>

        <IconContainer name="MapPin">
          <MapPin />
        </IconContainer>

        <IconContainer name="Menu">
          <Menu />
        </IconContainer>

        <IconContainer name="Minus">
          <Minus />
        </IconContainer>

        <IconContainer name="PackageDelivery">
          <PackageDelivery />
        </IconContainer>

        <IconContainer name="Phone">
          <Phone />
        </IconContainer>

        <IconContainer name="Pinterest">
          <Pinterest />
        </IconContainer>

        <IconContainer name="Plus">
          <Plus />
        </IconContainer>

        <IconContainer name="Printer">
          <Printer />
        </IconContainer>

        <IconContainer name="Profile">
          <Profile />
        </IconContainer>

        <IconContainer name="Receipt">
          <Receipt />
        </IconContainer>

        <IconContainer name="Save">
          <Save />
        </IconContainer>

        <IconContainer name="Settings">
          <Settings />
        </IconContainer>

        <IconContainer name="Shield">
          <Shield />
        </IconContainer>

        <IconContainer name="Shop">
          <Shop />
        </IconContainer>

        <IconContainer name="ShoppingCart">
          <ShoppingCart />
        </IconContainer>

        <IconContainer name="Switch">
          <Switch />
        </IconContainer>

        <IconContainer name="Text">
          <Text />
        </IconContainer>

        <IconContainer name="TikTok">
          <TikTok />
        </IconContainer>

        <IconContainer name="Timetable">
          <Timetable />
        </IconContainer>

        <IconContainer name="Trash">
          <Trash />
        </IconContainer>

        <IconContainer name="Truck">
          <Truck />
        </IconContainer>

        <IconContainer name="TruckWithClock">
          <TruckWithClock />
        </IconContainer>

        <IconContainer name="Twitter">
          <Twitter />
        </IconContainer>

        <IconContainer name="UserGroup">
          <UserGroup />
        </IconContainer>

        <IconContainer name="Wallet">
          <Wallet />
        </IconContainer>

        <IconContainer name="YouTube">
          <YouTube />
        </IconContainer>

        <IconContainer name="Zap">
          <Zap />
        </IconContainer>
      </ul>
    );
  },
};
