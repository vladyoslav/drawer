import React from 'react'

import { useRouter } from 'next/router'
import { type DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span className="font-bold text-lg">@vladyoslav/drawer</span>,
  project: {
    link: 'https://github.com/vladyoslav/drawer'
  },
  docsRepositoryBase: 'https://github.com/vladyoslav/drawer/docs',
  footer: {
    text: (
      <span>
        Built by{' '}
        <a href="https://github.com/vladyoslav" target="_blank">
          vladyoslav
        </a>
        . The source code is available on{' '}
        <a href="https://github.com/vladyoslav/drawer" target="_blank">
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
  },
  navigation: {
    prev: true,
    next: true
  }
}

export default config
