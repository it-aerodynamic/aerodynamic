export const homeQuery = `//groq
  *[_type == "home"]{
    title,
    description,
    hero -> {
      title,
      slides[] {
        title,
        subTitle,
        imageObject {
          caption,
          "src": image.asset -> url
        }
      }
    },
    services[] -> {
      title,
      description
    }
  }
`;

export const websiteConfigQuery = `//groq
  *[_type == "siteConfig"]{
    imageObject {
      caption,
      "src": image.asset -> url
    }
  }
`;
