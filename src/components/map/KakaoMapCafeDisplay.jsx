import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { IoCafe, IoCafeOutline } from 'react-icons/all';
import {
    addEvent,
    categorySearch,
    removeEvent,
    setMarkers,
} from '../../util/map/mapService';

const StyledMapCafeDisplayDiv = styled.div`
    position: absolute;
    top: 7rem;
    right: 1rem;
    width: 36px;
    height: 36px;
    overflow: hidden;
    background-color: #f5f5f5;
    z-index: 10;

    border: 1px solid #919191;
    border-radius: 5px;

    span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 36px;
        height: 36px;
        cursor: pointer;

        svg {
            flex: 1;
            font-size: 22px;
        }

        &:first-child {
            border-bottom: 1px solid #bfbfbf;
        }
    }
`;

const KakaoMapCafeDisplay = () => {
    const { map: kakaoMap } = useSelector((state) => ({
        map: state.mapSetting.map,
    }));
    const [isClicked, setIsClicked] = useState(false);

    // 버튼 클릭 시 토글
    const onClickToggle = () => {
        setIsClicked(!isClicked);
    };

    const handler = () => {
        categorySearch(kakaoMap, 'CE7');
    };
    // 버튼 클릭 시 지도에 카페 위치 마커 표시

    // 토글 on 일 때 지도 이동할 떄마다 현재 bound 에만 마커 표시
    useEffect(() => {
        if (!kakaoMap) return;
        if (isClicked) {
            addEvent(kakaoMap, 'dragend', handler);
        } else {
            // setMarkers(null);
        }
        console.log(kakaoMap);

        return () => {
            console.log('카페 버튼 컴포넌트 언마운트!');
            setMarkers(null);
            removeEvent(kakaoMap, 'dragend', handler);
        };
    }, [isClicked]);

    return (
        <>
            <StyledMapCafeDisplayDiv>
                <span onClick={onClickToggle}>
                    {isClicked ? <IoCafe /> : <IoCafeOutline />}
                </span>
            </StyledMapCafeDisplayDiv>
        </>
    );
};

export default KakaoMapCafeDisplay;
