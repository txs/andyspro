import React from 'react'

import { useHotkeys } from 'react-hotkeys-hook'
import { getBlockTitle, getBlockIcon, getBlockParentPage } from 'notion-utils'
import { useNotionContext } from 'packages/react-notion-x/src/context'
import { PageIcon } from 'packages/react-notion-x/src/components/page-icon'
import { SearchIcon } from 'packages/react-notion-x/src/icons/search-icon'
import { cs } from 'packages/react-notion-x/src/utils'
import { SearchDialog } from 'packages/react-notion-x/src/components/search-dialog'
import { IoSunnyOutline, IoMoonSharp } from 'react-icons/io5'

import styles from './styles.module.css'

export const PageHeader: React.FC<{
    isDarkMode: boolean
    toggleDarkMode: () => void
}> = ({ isDarkMode, toggleDarkMode }) => {

    // Setup Darkmode toggles
    const [hasMounted, setHasMounted] = React.useState(false)
    const toggleDarkModeCb = React.useCallback(
        (e) => {
            e.preventDefault()
            toggleDarkMode()
        },
        [toggleDarkMode]
    )

    React.useEffect(() => {
        setHasMounted(true)
    }, [])
    // Done Darkmode toggles

    const {
        components,
        recordMap,
        rootPageId,
        mapPageUrl,
        searchNotion
    } = useNotionContext()

    const blockMap = recordMap.block
    const blockIds = Object.keys(blockMap)
    const activePageId = blockIds[0]
    const hasSearch = !!searchNotion

    if (!activePageId) {
        return null
    }

    const breadcrumbs = []
    let currentPageId = activePageId

    do {
        const block = blockMap[currentPageId]?.value
        if (!block) {
            break
        }

        const title = getBlockTitle(block, recordMap)
        const icon = getBlockIcon(block, recordMap)

        if (!(title || icon)) {
            break
        }

        breadcrumbs.push({
            block,
            active: currentPageId === activePageId,
            pageId: currentPageId,
            title,
            icon
        })

        const parentBlock = getBlockParentPage(block, recordMap)
        const parentId = parentBlock?.id

        if (!parentId) {
            break
        }

        currentPageId = parentId
    } while (true)

    breadcrumbs.reverse()

    const [isSearchOpen, setIsSearchOpen] = React.useState(false)
    const onOpenSearch = React.useCallback(() => {
        setIsSearchOpen(true)
    }, [])

    const onCloseSearch = React.useCallback(() => {
        setIsSearchOpen(false)
    }, [])

    useHotkeys('cmd+p', (event) => {
        onOpenSearch()
        event.preventDefault()
        event.stopPropagation()
    })

    useHotkeys('cmd+k', (event) => {
        onOpenSearch()
        event.preventDefault()
        event.stopPropagation()
    })

    return (
        <header className='notion-header'>
            {isSearchOpen && hasSearch && (
                <SearchDialog
                    isOpen={isSearchOpen}
                    rootBlockId={rootPageId || activePageId}
                    onClose={onCloseSearch}
                    searchNotion={searchNotion}
                />
            )}

            <div className='nav-header'>
                <div className='breadcrumbs'>
                    {breadcrumbs.map((breadcrumb, index) => {
                        const pageLinkProps: any = {}
                        const componentMap = {
                            pageLink: components.pageLink
                        }

                        if (breadcrumb.active) {
                            componentMap.pageLink = (props) => <div {...props} />
                        } else {
                            pageLinkProps.href = mapPageUrl(breadcrumb.pageId)
                        }

                        return (
                            <React.Fragment key={breadcrumb.pageId}>
                                <componentMap.pageLink
                                    className={cs('breadcrumb', breadcrumb.active && 'active')}
                                    {...pageLinkProps}
                                >
                                    {breadcrumb.icon && (
                                        <PageIcon className='icon' block={breadcrumb.block} />
                                    )}

                                    {breadcrumb.title && (
                                        <span className='title'>{breadcrumb.title}</span>
                                    )}
                                </componentMap.pageLink>

                                {index < breadcrumbs.length - 1 && (
                                    <span className='spacer'>/</span>
                                )}
                            </React.Fragment>
                        )
                    })}
                </div>

                <div className='rhs'>
                    {hasMounted ? (
                        <div className={styles.settings}>
                            <a
                                className={styles.toggleDarkMode}
                                onClick={toggleDarkModeCb}
                                title='Toggle dark mode'
                            >
                                {isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
                            </a>
                        </div>
                    ) : null}
                    {hasSearch && (
                        <div
                            role='button'
                            className={cs('breadcrumb', 'button', 'notion-search-button')}
                            onClick={onOpenSearch}
                        >
                            <SearchIcon className='searchIcon' />

                            <span className='title'>Search</span>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
