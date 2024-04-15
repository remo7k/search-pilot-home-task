import * as Select from "@radix-ui/react-select";
import s from "./style.module.less";
import c from "classnames";
import React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface Props {
  options: string[];
  placeholder: string;
  name: string;
  onChange: (name: string, value: string) => void;
  value: string;
}

const SelectInput = ({
  options,
  placeholder,
  onChange,
  name,
  value,
}: Props) => {
  return (
    <section className={s.selectWrapper}>
      <Select.Root
        name={name}
        onValueChange={(value) => onChange(name, value)}
        value={value}
      >
        <Select.Trigger
          className={c(s.selectTrigger, { [s.placeholder]: value === "" })}
          data-qa={name}
          aria-label={name}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Content
          className={s.selectDropdown}
          position="popper"
          onKeyDown={(e) => console.log(e)}
        >
          <Select.Viewport>
            <Select.Group>
              {options.map((it) => {
                return (
                  <Select.Item key={it} className={s.selectItem} value={it}>
                    <Select.ItemText> {it} </Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                );
              })}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
    </section>
  );
};

export default SelectInput;
