"use client";
"use strict";

import React, { useState } from "react";
import reactCSS from "reactcss";
import { RGBColor, ChromePicker } from "react-color";

const DEFAULT_COLOR = {
  r: 90,
  g: 90,
  b: 90,
  a: 1,
};

const ColorPicker = React.forwardRef(
  ({ value, onChange }: { value: string; onChange: any }, ref) => {
    const [_color, _setColor] = useState<RGBColor>(DEFAULT_COLOR);

    function hexToRGB(hex: string): RGBColor {
      if (!hex) {
        return DEFAULT_COLOR;
      }
      hex = hex.replace(/^#/, "");

      // Convert short form hex color (#FFF) to long form (#FFFFFF)
      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((hex) => hex + hex)
          .join("");
      }

      // Convert to RGB
      const bigint = parseInt(hex, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;

      return { r, g, b };
    }

    function RGBToHex(color: RGBColor): string {
      let r = color.r.toString(16);
      let g = color.g.toString(16);
      let b = color.b.toString(16);

      if (r.length == 1) r = "0" + r;
      if (g.length == 1) g = "0" + g;
      if (b.length == 1) b = "0" + b;

      return "#" + r + g + b;
    }

    React.useEffect(() => {
      _setColor(hexToRGB(value));
    }, [value]);

    const handleChange = (color: { rgb: any }) => {
      _setColor(color.rgb);
      onChange(RGBToHex(color.rgb));
    };

    return <ChromePicker color={_color} onChange={handleChange} />;
  },
);

export default ColorPicker;
