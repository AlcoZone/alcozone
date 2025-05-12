import type { Meta, StoryObj } from "@storybook/react"
import { addDays } from "date-fns"
import DatePickerWithRange from "./InputSelect"

const meta: Meta<typeof DatePickerWithRange> = {
  title: "Components/DatePickerWithRange",
  component: DatePickerWithRange,
  tags: ["autodocs"],
}
export default meta

type Story = StoryObj<typeof DatePickerWithRange>

export const Default: Story = {
  args: {
    defaultDate: {
      from: new Date(2024, 0, 10),
      to: addDays(new Date(2024, 0, 10), 10),
    },
    placeholder: "Select a date range",
  },
}
