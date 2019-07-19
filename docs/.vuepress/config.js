module.exports = {
    title: 'WebScrapper Documentation', // Title of the website
    // appears in the meta tag and as a subtitle
    description: "A small documentation site",
    // Google Analytics tracking code
    ga: "Analytics code",
    themeConfig: {
        nav: [
            // links that will appear in the top navbar
            { text: 'Guide', link: '/guide/api-reference' },
            { text: 'Get Started', link: '/get-started/installation' },
            // external link
            { text: 'Github', link: 'https://github.com/cy56' }
        ],
        sidebar: [
            // These links will appear in the sidebar
            // Create heading groups
            {
                title: 'Getting Started',
                collapsable: false,
                children: [
                    // These are pages we'll add later
                    '/get-started/installation',
                    '/get-started/before-start',
                    '/get-started/kick-start'
                ]
            },
            {
                title: 'Guide',
                collapsable: false,
                children: [
                    // These are pages we'll add later
                    '/guide/api-reference',
                    '/guide/services'
                ]
            }
        ]
    }
}