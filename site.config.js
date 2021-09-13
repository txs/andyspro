module.exports = {
  // where it all starts -- the site's root Notion page (required)
  rootNotionPageId: '58e2b8cd439a47ff9520825068bd58af',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: null,

  // basic site info (required)
  name: 'Andy\'s Pro',
  domain: 'andys.pro',
  author: 'Andy Tseng',

  // open graph metadata (optional)
  description: 'Example site description',
  socialImageTitle: 'Andy\'s Pro',
  socialImageSubtitle: 'Hello World! 👋',

  // social usernames (optional)
  twitter: 'txshon',
  github: 'txs',
  linkedin: 'andyt08',

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  // image CDN host to proxy all image requests through (optional)
  // NOTE: this requires you to set up an external image proxy
  imageCDNHost: null,

  // Utteranc.es comments via GitHub issue comments (optional)
  utterancesGitHubRepo: null,

  // whether or not to enable support for LQIP preview images (optional)
  // NOTE: this requires you to set up Google Firebase and add the environment
  // variables specified in .env.example
  isPreviewImageSupportEnabled: false,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  // pageUrlOverrides: {
  //   '/foo': '067dd719a912471ea9a3ac10710e7fdf',
  //   '/bar': '0be6efce9daf42688f65c76b89f8eb27'
  // }
  // pageUrlOverrides: null
  pageUrlOverrides: {
    '/blog': 'd0d2ae4ecdcb402ba5ef71302edfc2b4',
    '/blog-react': 'cc3f3a663d8f4216808a38a5c44cae73',
    '/blog-gatsby': '13a301f8694d49c79f4b49ccfd14c900',
    '/course': 'ecc14d481c364a4291b19f516c3406cd',
    '/tw': 'd7ee3960142449a3bcf03f9ddb108645',
    '/tw-blog': '41f2f0619fd441b8932b8ab5944fa466'

  }



}
