# AvatarGroup
A flexible avatar component that displays user profile images in circular containers with configurable sizes, automatic initials fallback, group mode with overlap, and status indicators.

## Getting Started

Install dependencies:
```bash
npm install
```

Share the component to your Webflow workspace:
```bash
npx webflow library share
```

For local development:
```bash
npm run dev
```

## Designer Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| ID | Id | — | HTML ID attribute for targeting |
| Mode | Variant | single | Display mode for single or grouped avatars (single, group) |
| Size | Variant | medium | Avatar size variant (small, medium, large, extra-large) |
| Show Border | Boolean | false | Show border ring around avatars |
| Overlap Amount | Variant | medium | Amount of overlap between avatars in group mode (none, small, medium, large) |
| Max Count | Number | 4 | Maximum number of avatars to show before displaying overflow indicator |
| Avatar 1 Image | Image | — | First avatar image URL |
| Avatar 1 Name | Text | John Doe | First avatar name for initials fallback |
| Avatar 1 Status | Variant | none | First avatar status indicator (none, online, offline, busy) |
| Avatar 1 Visible | Visibility | — | Show or hide the first avatar |
| Avatar 2 Image | Image | — | Second avatar image URL |
| Avatar 2 Name | Text | Jane Smith | Second avatar name for initials fallback |
| Avatar 2 Status | Variant | none | Second avatar status indicator (none, online, offline, busy) |
| Avatar 2 Visible | Visibility | — | Show or hide the second avatar |
| Avatar 3 Image | Image | — | Third avatar image URL |
| Avatar 3 Name | Text | Mike Johnson | Third avatar name for initials fallback |
| Avatar 3 Status | Variant | none | Third avatar status indicator (none, online, offline, busy) |
| Avatar 3 Visible | Visibility | — | Show or hide the third avatar |
| Avatar 4 Image | Image | — | Fourth avatar image URL |
| Avatar 4 Name | Text | Sarah Williams | Fourth avatar name for initials fallback |
| Avatar 4 Status | Variant | none | Fourth avatar status indicator (none, online, offline, busy) |
| Avatar 4 Visible | Visibility | — | Show or hide the fourth avatar |
| Avatar 5 Image | Image | — | Fifth avatar image URL |
| Avatar 5 Name | Text | David Brown | Fifth avatar name for initials fallback |
| Avatar 5 Status | Variant | none | Fifth avatar status indicator (none, online, offline, busy) |
| Avatar 5 Visible | Visibility | — | Show or hide the fifth avatar |
| Total Count | Number | 5 | Total number of avatars for overflow calculation (when exceeds maxCount) |

## Styling

This component automatically adapts to your Webflow site's design system through site variables and inherited properties.

### Site Variables

To match your site's design system, define these CSS variables in your Webflow project settings. The component will use the fallback values shown below until you configure them.

| Site Variable | What It Controls | Fallback |
|---------------|------------------|----------|
| --background-primary | Avatar background, overflow indicator background, and border ring background | #ffffff |
| --text-primary | Initials text color and overflow indicator text color | #1a1a1a |
| --border-color | Avatar border ring color and overflow indicator border | #e5e5e5 |

### Inherited Properties

The component inherits these CSS properties from its parent element:
- `font-family` — Typography style for initials and overflow text
- `color` — Base text color
- `line-height` — Text spacing

## Extending in Code

### Custom Avatar Background Colors

Generate unique background colors for initials based on user names:

```javascript
// Add to your component logic
function getAvatarColor(name) {
  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

// Apply to avatar wrapper
avatarElement.style.setProperty('--wf-avatargroup-bg-color', getAvatarColor(name));
```

### Dynamic Avatar Loading

Populate avatars from an API or CMS data source:

```javascript
// Fetch user data and update avatar properties
async function loadTeamMembers() {
  const users = await fetch('/api/team').then(r => r.json());
  
  users.slice(0, 5).forEach((user, index) => {
    const avatarNum = index + 1;
    component.props[`avatar${avatarNum}Image`] = user.avatarUrl;
    component.props[`avatar${avatarNum}Name`] = user.name;
    component.props[`avatar${avatarNum}Status`] = user.onlineStatus;
  });
  
  component.props.totalCount = users.length;
}
```

## Dependencies

No external dependencies.