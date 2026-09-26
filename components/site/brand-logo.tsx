"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

/** Paths from public/Logo.svg — MIAN mark (left) + DAST wordmark on the plate. */
const MARK_PATH =
  "M51.9 141.3H216.6V159.6H51.9V141.3ZM51.9 190.2H216.6V208.2H51.9V190.2ZM51.9 240H217.5V260.1H51.9V240ZM0 42.6H268.5V63.6H0V42.6ZM34.2 91.5H233.7V277.2H210.3V111.6H56.7V277.2H34.2V91.5ZM122.7 53.4L150.3 55.5C147.5 64.3 144.4 73.2 141 82.2C137.8 91 134.8 98.6 132 105L110.4 101.7C112 97.1 113.6 92 115.2 86.4C116.8 80.6 118.2 74.8 119.4 69C120.8 63.2 121.9 58 122.7 53.4ZM194.4 0.599992L219.3 7.2C213.7 15.2 207.8 23.2 201.6 31.2C195.4 39.2 189.7 46.1 184.5 51.9L165 45.3C168.4 41.1 171.9 36.4 175.5 31.2C179.1 26 182.5 20.8 185.7 15.6C189.1 10.2 192 5.19999 194.4 0.599992ZM52.2 8.7L72 0C77.6 5.4 83 11.5 88.2 18.3C93.6 24.9 97.7 30.7 100.5 35.7L79.8 46.5C77.2 41.3 73.2 35.2 67.8 28.2C62.6 21 57.4 14.5 52.2 8.7Z";

const WORD_PATHS = [
  "M413.55 253.2H346.22V35.0182H416.533C437.698 35.0182 455.809 39.3861 470.865 48.1219C485.922 56.7866 497.463 69.2511 505.489 85.5154C513.514 101.709 517.527 121.098 517.527 143.683C517.527 166.41 513.479 185.977 505.382 202.383C497.286 218.718 485.496 231.289 470.013 240.096C454.53 248.832 435.709 253.2 413.55 253.2ZM372.641 229.763H411.845C429.885 229.763 444.836 226.282 456.696 219.322C468.557 212.362 477.399 202.454 483.223 189.599C489.047 176.744 491.959 161.439 491.959 143.683C491.959 126.069 489.083 110.906 483.33 98.1929C477.577 85.4088 468.983 75.6077 457.549 68.7895C446.114 61.9003 431.874 58.4557 414.828 58.4557H372.641V229.763Z",
  "M560.54 253.2H532.842L612.955 35.0182H640.228L720.342 253.2H692.643L627.444 69.5352H625.739L560.54 253.2ZM570.768 167.973H682.415V191.41H570.768V167.973Z",
  "M873.644 89.5636C872.366 78.7682 867.181 70.3875 858.09 64.4216C848.999 58.4557 837.849 55.4727 824.638 55.4727C814.979 55.4727 806.528 57.0352 799.283 60.1602C792.11 63.2852 786.499 67.5821 782.451 73.0509C778.474 78.5196 776.485 84.7341 776.485 91.6943C776.485 97.5182 777.87 102.525 780.64 106.716C783.481 110.835 787.103 114.28 791.506 117.049C795.91 119.748 800.526 121.986 805.356 123.761C810.185 125.466 814.624 126.851 818.672 127.916L840.832 133.882C846.513 135.373 852.834 137.433 859.795 140.061C866.826 142.689 873.538 146.275 879.93 150.821C886.393 155.295 891.719 161.048 895.91 168.079C900.1 175.111 902.195 183.74 902.195 193.967C902.195 205.757 899.106 216.41 892.927 225.927C886.819 235.444 877.87 243.008 866.08 248.619C854.361 254.23 840.121 257.035 823.36 257.035C807.735 257.035 794.205 254.514 782.771 249.471C771.407 244.429 762.458 237.397 755.924 228.378C749.461 219.358 745.803 208.882 744.951 196.95H772.224C772.934 205.189 775.704 212.007 780.533 217.405C785.434 222.731 791.613 226.709 799.07 229.336C806.599 231.893 814.695 233.172 823.36 233.172C833.445 233.172 842.501 231.538 850.526 228.271C858.552 224.933 864.908 220.316 869.596 214.422C874.283 208.456 876.627 201.495 876.627 193.541C876.627 186.297 874.603 180.402 870.555 175.856C866.506 171.311 861.18 167.618 854.575 164.777C847.969 161.936 840.832 159.45 833.161 157.319L806.315 149.649C789.269 144.748 775.775 137.753 765.832 128.662C755.888 119.571 750.917 107.674 750.917 92.9727C750.917 80.7568 754.219 70.1034 760.824 61.0125C767.501 51.8506 776.449 44.7483 787.671 39.7057C798.964 34.5921 811.57 32.0352 825.491 32.0352C839.553 32.0352 852.053 34.5565 862.991 39.5991C873.928 44.5707 882.593 51.3889 888.985 60.0537C895.448 68.7185 898.857 78.5551 899.212 89.5636H873.644Z",
  "M933.703 58.4557V35.0182H1097.34V58.4557H1028.73V253.2H1002.31V58.4557H933.703Z",
];

/**
 * Brand mark from public/Logo.svg — MIAN icon + rounded DAST plate with angular/conic gradient.
 * Colors flip with light/dark via --logo-* tokens in globals.css.
 * `variant="mark"` = service icon only (no DAST wordmark) for chat/embed bubbles.
 */
export function BrandLogo({
  className,
  href = "/",
  priority,
  linked = true,
  variant = "full",
}: {
  className?: string;
  href?: string;
  /** Larger footer mark */
  priority?: "nav" | "footer";
  /** Set false for decorative marks (embed chrome, badges). */
  linked?: boolean;
  /** `mark` = MIAN icon only, no wordmark text. */
  variant?: "full" | "mark";
}) {
  const size = priority === "footer" ? "h-9 md:h-11" : "h-7";
  const isMark = variant === "mark";

  const mark = (
    <span
      className={cn(
        "relative inline-block shrink-0 overflow-hidden",
        isMark ? "h-8 aspect-square rounded-[3px]" : cn(size, "aspect-[1112/278]"),
        className,
      )}
      aria-hidden={linked ? undefined : true}
    >
      {isMark ? (
        <svg
          viewBox="0 0 270 278"
          className="relative h-full w-full block"
          xmlns="http://www.w3.org/2000/svg"
          role={linked ? undefined : "img"}
          aria-label={linked ? undefined : "MIAN"}
        >
          <path d={MARK_PATH} fill="var(--logo-mark)" />
        </svg>
      ) : (
        <>
          <span
            className="absolute brand-logo-plate"
            style={{
              left: "28.76%",
              top: "4.03%",
              width: "71.22%",
              height: "95.68%",
              borderRadius: "3.6% / 3.76%",
              background:
                "conic-gradient(from 90deg at 50% 50%, var(--logo-from) 0deg, var(--logo-to) 360deg)",
            }}
          />
          <svg
            viewBox="0 0 1112 278"
            className="relative h-full w-auto block"
            xmlns="http://www.w3.org/2000/svg"
            role={linked ? undefined : "img"}
            aria-label={linked ? undefined : "MIAN DAST"}
          >
            <path d={MARK_PATH} fill="var(--logo-mark)" />
            {WORD_PATHS.map((d) => (
              <path key={d.slice(0, 24)} d={d} fill="var(--logo-text)" />
            ))}
          </svg>
        </>
      )}
    </span>
  );

  if (!linked) return mark;

  return (
    <Link
      href={href}
      className="inline-flex items-center shrink-0 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
      aria-label="MIAN DAST home"
    >
      {mark}
    </Link>
  );
}
