import React from "react";

type TooltipParams = {
	title: string;
	onMouseEnter?: () => void;
	placement?: "top" | "bottom" | "left" | "right"
	style?: React.CSSProperties;
	children: JSX.Element;
}

const div = document.createElement("div"),
	mo = new MutationObserver(r => {
		const target = r.at(0)?.target as HTMLElement | null;

		if (target) {
			showTooltip({ target }, false);
		}
	}),
	showTooltip = ({ target }: { target: HTMLElement }, observe = true) => {
		const { width: tWidth, height: tHeight } = target.getBoundingClientRect(),
			content = target.dataset.tooltip ?? null,
			{ scrollHeight, scrollWidth } = document.documentElement;


		if (content) {
			let x = 0,
				y = 0,
				op = target as HTMLElement | null,
				p: HTMLElement | null = target;

			while (p && p !== document.body) {
				if (p === op) {

					x += op.offsetLeft;
					y += op.offsetTop;
					op = op.offsetParent as HTMLElement | null;
				}

				x -= p.scrollLeft;
				y -= p.scrollTop;

				p = p.parentElement;
			}

			div.textContent = content;

			document.body.append(div);

			const { width: dWidth, height: dHeight } = div.getBoundingClientRect();

			let left = 0, top = 0;

			switch (target.dataset.tooltipPos) {
				case "top":
					top = y - dHeight - 10;
					left = x + (tWidth - dWidth) / 2;

					break;
				case "left":
					top = y + (tHeight - dHeight) / 2;
					left = x - dWidth - 10;
			}

			top = Math.min(Math.max(0, top), scrollHeight - dHeight);
			left = Math.min(Math.max(0, left), scrollWidth - dWidth);

			if (top === 0 && target.dataset.tooltipPos === "top" && top < y + tHeight && top + dHeight > y) {
				top = y + tHeight + 10;
			}

			if (left === 0 && target.dataset.tooltipPos === "left" && left < x + tWidth && left + dWidth > x) {
				left = x + tWidth + 10;
			}

			div.setAttribute("style", `top: ${top | 0}px; left: ${left | 0}px`);
		}

		if (observe) {
			mo.observe(target, { "attributes": true, "attributeFilter": ["data-tooltip-pos", "data-tooltip"] });
		}
	},
	removeTooltip = () => {
		div.remove()
		mo.disconnect();
	};

div.setAttribute("id", "tooltip");

export function Tooltip({ title, placement, onMouseEnter, children }: TooltipParams) {
	return React.cloneElement(children, {
		"data-tooltip-pos": placement || "top",
		"data-tooltip": title,
		"onMouseEnter": onMouseEnter,
		"onMouseOver": showTooltip,
		"onMouseOut": removeTooltip
	});
}