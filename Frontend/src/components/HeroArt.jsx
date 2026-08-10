import { motion } from "framer-motion";

const productColors = {
  amber: ["#4FA8E0", "#F26D6D", "#7ED6A5", "#B784E0"],
  blue: ["#F26D6D", "#4FA8E0", "#FFC530", "#7ED6A5"],
  green: ["#B784E0", "#F2A900", "#4FA8E0", "#F26D6D"],
};

const jacketColors = {
  amber: { front: "#E8A33D", back: "#F2C14E" },
  blue: { front: "#3D8BE8", back: "#6FB4F2" },
  green: { front: "#3DA35B", back: "#6FCB86" },
};

export default function HeroArt({ theme = "amber" }) {
  const products = productColors[theme] ?? productColors.amber;
  const jackets = jacketColors[theme] ?? jacketColors.amber;

  return (
    <motion.svg
      viewBox="0 0 480 460"
      className="h-full w-full"
      role="img"
      aria-label="Illustration of two shoppers holding a basket full of everyday essentials"
    >
      <ellipse cx="240" cy="438" rx="165" ry="16" fill="#231F20" opacity="0.08" />

      {/* back shopper */}
      <g>
        <path
          d="M300,150 Q343,152 352,202 L362,378 Q363,398 342,398 L252,398 Q232,398 234,378 L246,192 Q251,150 300,150 Z"
          fill={jackets.back}
        />
        <circle cx="301" cy="118" r="33" fill="#F3B88A" />
        <path d="M271,102 Q301,72 331,102 Q330,80 301,78 Q272,80 271,102Z" fill="#2B1B12" />
        <path d="M283,138 q18,14 36,0" stroke="#2B1B12" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>

      {/* front shopper */}
      <g>
        <path
          d="M177,140 Q227,135 243,190 L253,392 Q254,412 229,412 L122,412 Q102,412 104,392 L120,180 Q127,140 177,140 Z"
          fill={jackets.front}
        />
        <circle cx="173" cy="100" r="37" fill="#F3B88A" />
        <path d="M136,88 Q173,54 210,88 Q207,66 173,64 Q140,66 136,88Z" fill="#2B1B12" />
        <path d="M154,122 q19,15 38,0" stroke="#2B1B12" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>

      {/* basket */}
      <g>
        <path
          d="M142,332 L302,332 L286,414 Q284,424 274,424 L170,424 Q160,424 158,414 Z"
          fill="#FFC530"
          stroke="#231F20"
          strokeWidth="3"
        />
        <rect x="152" y="311" width="140" height="24" rx="8" fill="#FFDB70" stroke="#231F20" strokeWidth="3" />
        <text x="222" y="329" textAnchor="middle" fontSize="10" fontWeight="700" fill="#231F20" opacity="0.55">
          NOT ON MRP
        </text>

        <motion.rect
          animate={{ y: [270, 262, 270] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          x="168" y="270" width="18" height="45" rx="6" fill={products[0]}
        />
        <motion.rect
          animate={{ y: [255, 246, 255] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          x="193" y="255" width="16" height="60" rx="6" fill={products[1]}
        />
        <motion.circle
          animate={{ y: [270, 260, 270] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          cx="228" cy="270" r="16" fill={products[2]}
        />
        <motion.rect
          animate={{ y: [260, 250, 260] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
          x="248" y="260" width="20" height="55" rx="8" fill={products[3]}
        />
      </g>
    </motion.svg>
  );
}
