const { useState } = React

export function LongTxt({ txt, length = 100 }) {
    const [isShowMore, setIsShowMore] = useState(false)

    function getTxtToShow() {
        if (txt.length <= length || isShowMore) return txt
        return txt.substring(0, length) + '...'
    }

    function toggleShowMore() {
        setIsShowMore(prev => !prev)
    }

    if (txt.length <= length) return <p>{txt}</p>

    return (
        <div className="long-txt">
            <p>{getTxtToShow()}</p>
            <button className="show-more-btn" onClick={toggleShowMore}>
                {isShowMore ? 'Read Less' : 'Read More'}
            </button>
        </div>
    )
}