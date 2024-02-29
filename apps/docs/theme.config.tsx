import React from 'react'

import { useRouter } from 'next/router'
import { type DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span className="text-lg font-bold">@vladyoslav/drawer</span>,
  project: {
    link: 'https://github.com/vladyoslav/drawer'
  },
  docsRepositoryBase: 'https://github.com/vladyoslav/drawer/tree/main/docs',
  footer: {
    text: (
      <span>
        Built by{' '}
        <a
          href="https://github.com/vladyoslav"
          target="_blank"
          className="font-medium !underline underline-offset-4"
          style={{ textDecoration: 'underline' }}
        >
          vladyoslav
        </a>
        . The source code is available on{' '}
        <a
          href="https://github.com/vladyoslav/drawer"
          target="_blank"
          className="font-medium !underline underline-offset-4"
          style={{ textDecoration: 'underline' }}
        >
          GitHub
        </a>
        .
      </span>
    )
  },
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – @vladyoslav/drawer'
      }
    }

    return {
      titleTemplate: '@vladyoslav/drawer – %s'
    }
  },
  navigation: {
    prev: true,
    next: true
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        property="og:description"
        content="Draggable Drawer Component for React"
      />
      <link rel="icon" href="/images/favicon.ico" />
    </>
  )
}

export default config
