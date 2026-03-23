import { useMemo } from "react";

export interface AvatarGroupProps {
  id?: string;
  mode?: "single" | "group";
  size?: "small" | "medium" | "large" | "extra-large";
  showBorder?: boolean;
  overlapAmount?: "none" | "small" | "medium" | "large";
  maxCount?: number;
  avatar1Image?: { src: string; alt?: string };
  avatar1Name?: string;
  avatar1Status?: "none" | "online" | "offline" | "busy";
  avatar1Visible?: boolean;
  avatar2Image?: { src: string; alt?: string };
  avatar2Name?: string;
  avatar2Status?: "none" | "online" | "offline" | "busy";
  avatar2Visible?: boolean;
  avatar3Image?: { src: string; alt?: string };
  avatar3Name?: string;
  avatar3Status?: "none" | "online" | "offline" | "busy";
  avatar3Visible?: boolean;
  avatar4Image?: { src: string; alt?: string };
  avatar4Name?: string;
  avatar4Status?: "none" | "online" | "offline" | "busy";
  avatar4Visible?: boolean;
  avatar5Image?: { src: string; alt?: string };
  avatar5Name?: string;
  avatar5Status?: "none" | "online" | "offline" | "busy";
  avatar5Visible?: boolean;
  totalCount?: number;
}

interface Avatar {
  image?: { src: string; alt?: string };
  name: string;
  status: "none" | "online" | "offline" | "busy";
  visible: boolean;
}

const sizeMap = {
  small: "32px",
  medium: "40px",
  large: "48px",
  "extra-large": "64px",
};

const overlapMap = {
  none: "0px",
  small: "-8px",
  medium: "-12px",
  large: "-16px",
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function getColorFromName(name: string): string {
  const colors = [
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#f59e0b",
    "#10b981",
    "#06b6d4",
    "#6366f1",
    "#f97316",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function AvatarGroup({
  id,
  mode = "single",
  size = "medium",
  showBorder = false,
  overlapAmount = "medium",
  maxCount = 4,
  avatar1Image,
  avatar1Name = "John Doe",
  avatar1Status = "none",
  avatar1Visible = true,
  avatar2Image,
  avatar2Name = "Jane Smith",
  avatar2Status = "none",
  avatar2Visible = true,
  avatar3Image,
  avatar3Name = "Mike Johnson",
  avatar3Status = "none",
  avatar3Visible = true,
  avatar4Image,
  avatar4Name = "Sarah Williams",
  avatar4Status = "none",
  avatar4Visible = true,
  avatar5Image,
  avatar5Name = "David Brown",
  avatar5Status = "none",
  avatar5Visible = true,
  totalCount = 5,
}: AvatarGroupProps) {
  const avatars: Avatar[] = useMemo(
    () => [
      { image: avatar1Image, name: avatar1Name, status: avatar1Status, visible: avatar1Visible },
      { image: avatar2Image, name: avatar2Name, status: avatar2Status, visible: avatar2Visible },
      { image: avatar3Image, name: avatar3Name, status: avatar3Status, visible: avatar3Visible },
      { image: avatar4Image, name: avatar4Name, status: avatar4Status, visible: avatar4Visible },
      { image: avatar5Image, name: avatar5Name, status: avatar5Status, visible: avatar5Visible },
    ],
    [
      avatar1Image, avatar1Name, avatar1Status, avatar1Visible,
      avatar2Image, avatar2Name, avatar2Status, avatar2Visible,
      avatar3Image, avatar3Name, avatar3Status, avatar3Visible,
      avatar4Image, avatar4Name, avatar4Status, avatar4Visible,
      avatar5Image, avatar5Name, avatar5Status, avatar5Visible,
    ]
  );

  const visibleAvatars = avatars.filter((avatar) => avatar.visible);
  // In single mode, always show avatar1 specifically — Visible props only apply in group mode
  const displayAvatars = mode === "single" ? avatars.slice(0, 1) : visibleAvatars.slice(0, maxCount);
  const overflowCount = totalCount - maxCount;
  const showOverflow = mode === "group" && overflowCount > 0;

  const avatarSize = sizeMap[size];
  const overlap = mode === "group" ? overlapMap[overlapAmount] : "0px";

  return (
    <div
      id={id}
      className={`wf-avatargroup wf-avatargroup--${mode} wf-avatargroup--${size}`}
      style={
        {
          "--wf-avatargroup-size": avatarSize,
          "--wf-avatargroup-overlap": overlap,
        } as React.CSSProperties
      }
    >
      <div className="wf-avatargroup-container">
        {displayAvatars.map((avatar, index) => (
          <div
            key={index}
            className={`wf-avatargroup-avatar ${showBorder ? "wf-avatargroup-avatar--bordered" : ""}`}
            style={
              {
                "--wf-avatargroup-bg-color": avatar.image ? "transparent" : getColorFromName(avatar.name),
              } as React.CSSProperties
            }
          >
            {avatar.image ? (
              <img src={avatar.image.src} alt={avatar.image.alt || avatar.name} className="wf-avatargroup-image" />
            ) : (
              <span className="wf-avatargroup-initials">{getInitials(avatar.name)}</span>
            )}
            {avatar.status !== "none" && (
              <span className={`wf-avatargroup-status wf-avatargroup-status--${avatar.status}`} />
            )}
          </div>
        ))}
        {showOverflow && (
          <div className={`wf-avatargroup-avatar wf-avatargroup-overflow ${showBorder ? "wf-avatargroup-avatar--bordered" : ""}`}>
            <span className="wf-avatargroup-overflow-text">+{overflowCount}</span>
          </div>
        )}
      </div>
    </div>
  );
}