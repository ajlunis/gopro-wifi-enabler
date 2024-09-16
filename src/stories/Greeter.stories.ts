import type { Meta, StoryObj } from "@storybook/react";
import Greeter from "../Greeter";

const meta: Meta<typeof Greeter> = {
  title: "Greeter",
  component: Greeter,
  parameters: {
    layout: "centered",
  },
  tags: [],
  argTypes: {
    onConnect: { action: 'clicked' }, // Track the Connect button action
  },
};

export default meta;
type Story = StoryObj<typeof Greeter>;

export const Idle: Story = {
  args: {
    connecting: false,
    bluetoothUnavailable: false,
  },
};

export const Connecting: Story = {
  args: {
    connecting: true,
    bluetoothUnavailable: false,
  },
};

export const BluetoothUnavailable: Story = {
  args: {
    connecting: false,
    bluetoothUnavailable: true,
  },
};
