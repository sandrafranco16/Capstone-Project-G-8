const DEFAULT_REPOSITORY = "Hjl2065889707/Capstone-Project-G-8";
const DEFAULT_BRANCH = "main";

type CmsEnvironment = Partial<
  Pick<
    NodeJS.ProcessEnv,
    "CMS_REPOSITORY" | "CMS_BRANCH" | "CMS_OAUTH_BASE_URL" | "NODE_ENV"
  >
>;

export type CmsConfig = {
  repository: string;
  branch: string;
  baseUrl: string;
  localBackend: boolean;
  editorialWorkflow: boolean;
};

function validateRepository(value: string) {
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(value)) {
    throw new Error("CMS_REPOSITORY must use the owner/repository format.");
  }
}

function validateBranch(value: string) {
  if (
    !value ||
    /[\s~^:?*\\\[\]]/.test(value) ||
    value.startsWith("-") ||
    value.endsWith(".")
  ) {
    throw new Error("CMS_BRANCH is not a valid Git branch name.");
  }
}

function normaliseBaseUrl(value: string) {
  const url = new URL(value);

  if (
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/"
  ) {
    throw new Error("CMS_OAUTH_BASE_URL must contain only the site origin.");
  }

  if (
    url.protocol !== "https:" &&
    !(url.protocol === "http:" && url.hostname === "localhost")
  ) {
    throw new Error("CMS_OAUTH_BASE_URL must use HTTPS, except on localhost.");
  }

  return url.origin;
}

export function getCmsConfig(
  environment: CmsEnvironment = process.env,
  requestOrigin = "http://localhost:3000",
): CmsConfig {
  const repository = environment.CMS_REPOSITORY?.trim() || DEFAULT_REPOSITORY;
  const branch = environment.CMS_BRANCH?.trim() || DEFAULT_BRANCH;
  const baseUrl = normaliseBaseUrl(
    environment.CMS_OAUTH_BASE_URL?.trim() || requestOrigin,
  );

  validateRepository(repository);
  validateBranch(branch);

  return {
    repository,
    branch,
    baseUrl,
    localBackend: environment.NODE_ENV !== "production",
    editorialWorkflow: environment.NODE_ENV === "production",
  };
}

function quoteYaml(value: string) {
  return JSON.stringify(value);
}

export function renderCmsConfig(config: CmsConfig) {
  const localBackend = config.localBackend ? "\nlocal_backend: true\n" : "\n";
  const publishMode = config.editorialWorkflow
    ? "publish_mode: editorial_workflow\n\n"
    : "";

  return `backend:
  name: github
  repo: ${quoteYaml(config.repository)}
  branch: ${quoteYaml(config.branch)}
  base_url: ${quoteYaml(config.baseUrl)}
  auth_endpoint: /api/cms/auth
${localBackend}
${publishMode}
media_folder: public/uploads
public_folder: /uploads

collections:
  - name: blog
    label: Blog
    folder: src/content/blog
    create: true
    extension: md
    format: frontmatter
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    preview_path: blog/{{slug}}
    sortable_fields:
      - publishedAt
      - title
      - category
    fields:
      - { label: Title, name: title, widget: string }
      - { label: Summary, name: excerpt, widget: text }
      - label: Category
        name: category
        widget: select
        options:
          - Career Development
          - AI and Automation
          - AI Governance
          - Executive and Board
          - AI Risk
      - { label: Publish Date, name: publishedAt, widget: datetime }
      - { label: YouTube URL, name: youtubeUrl, widget: string, required: false }
      - { label: Body, name: body, widget: markdown }
`;
}
