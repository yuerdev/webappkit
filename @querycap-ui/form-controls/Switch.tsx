import { animated, cover, safeTextColor, selector, themes, tintOrShade, useSpring, useTheme } from "@querycap-ui/core";
import React, { forwardRef, ReactNode, useEffect } from "react";
import { ControlledInput } from "./Input";

export interface SwitchProps extends ControlledInput<boolean> {
  tips?: [ReactNode, ReactNode];
}

export const Switch = forwardRef(({ name, value, tips, onValueChange, disabled, ...props }: SwitchProps, ref) => {
  const ds = useTheme();

  const getStyle = (value: boolean) => {
    const bgOfDisabled = tintOrShade(0.1, ds.state.backgroundColor);

    if (value) {
      return {
        transform: `translate3d(${tips ? "150%" : "50%"},0,0)`,
        color: disabled ? bgOfDisabled : ds.colors.primary,
        onOpacity: 1,
        offOpacity: 0,
      };
    }

    return {
      transform: `translate3d(0,0,0)`,
      color: disabled ? bgOfDisabled : tintOrShade(0.3, ds.state.backgroundColor),
      onOpacity: 0,
      offOpacity: 1,
    };
  };

  const [styles, set] = useSpring(() => getStyle(value));

  const next = getStyle(value);

  useEffect(() => {
    set(next);
  }, [value]);

  return (
    <label {...props} role="switch" aria-checked={value}>
      <input
        ref={ref as any}
        name={name}
        style={{ display: "none" }}
        type="checkbox"
        value={value as any}
        disabled={disabled}
        onChange={() => !disabled && onValueChange(!value)}
      />
      <animated.div
        style={{
          borderColor: styles.color,
          backgroundColor: styles.color,
        }}
        css={selector()
          .position("relative")
          .display("inline-block")
          .top("0.125em")
          .height("1em")
          .width(tips ? "2.5em" : "1.5em")
          .borderRadius("0.6em")
          .border("1px solid")
          .cursor(!disabled ? "pointer" : "default")}>
        {tips && (
          <div
            css={selector()
              .fontSize("0.6em")
              .textTransform("uppercase")
              .color(safeTextColor(next.color))
              .with(selector("& > *").paddingX(themes.space.s1).with(cover()))}>
            <animated.span style={{ opacity: styles.onOpacity }} css={{ textAlign: "left" }}>
              {tips[0]}
            </animated.span>
            <animated.span style={{ opacity: styles.offOpacity }} css={{ textAlign: "right" }}>
              {tips[1]}
            </animated.span>
          </div>
        )}

        <animated.div
          style={{
            borderColor: styles.color,
            transform: styles.transform,
          }}
          css={selector()
            .position("absolute")
            .top(-1)
            .left(-1)
            .display("block")
            .height("1em")
            .width("1em")
            .borderRadius("100%")
            .border("2px solid")
            .backgroundColor("white")
            .pointerEvents("none")
            .with(
              selector("&:before")
                .content(`""`)
                .with(cover())
                .zIndex(1)
                .backgroundColor((t) => tintOrShade(-0.15, t.state.color))
                .borderRadius("100%")
                .boxShadow("0 2px 4px 0 rgba(0,0,0,0.3)"),
            )}
        />
      </animated.div>
    </label>
  );
});
