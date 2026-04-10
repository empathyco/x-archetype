## Create Jira task (board ENG 729)

You are going to create **a Jira Cloud issue** using the Atlassian MCP configured in this repo.

### Defaults (edit once and done)

- **Project (project key)**: `ENG`
- **Board (reference)**: `729`
- **Brand**: `Empathy AI`
- **Scope**: `Innovation`
- **Labels**: `frontend`
- **Components**: `Frontend`
- **Monthly Report**: `EmpathyAI`
- **Default assignee**: current user (assign to “me”)

If the user doesn’t specify otherwise, use these values.

---

### Minimum questions (only if missing)

If it’s not in the user message, ask **only** for:

- **Title**
- **Description** (or context)

Optionally (if the user provides it or it’s important):

- **Issue type** (one of: `Task`, `Story`, `Bug`, `Epic`; default `Task`)
- **Parent**
- **Priority**

---

### Instructions to create the issue

0. Before creating anything, make sure you can set the custom fields. If you don’t know the internal IDs:
    - Fetch the create metadata for project `ENG` and the chosen `issuetype` (default `Task`)
    - Map fields by their **visible name** in Jira: `Brand`, `Scope`, `Components`, `Monthly Report`
    - Use the default values listed above

1. Create an issue in project `ENG` with:
    - **summary**: the title
    - **description**: a clear description including:
        - Context
        - What needs to be done
        - Acceptance criteria (bullets)
    - **issuetype**: `Task` (if not specified)
    - **Brand**: `Empathy AI`
    - **Scope**: `Innovation`
    - **Components**: `Frontend`
    - **Monthly Report**: `EmpathyAI`
    - **assignee**: assign to the current user (“Assign to me”), unless the user requests someone else

2. Return:
    - The created **issue key** (e.g. `ENG-123`)
    - The **link** to the issue in `searchbroker.atlassian.net`
    - A 3–6 bullet summary of what was recorded

---

### Suggested user input message

Paste this and fill it in:

- Title:
- Context:
- (Optional) Priority / Assignee / extra labels: