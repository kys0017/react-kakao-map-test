import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { GrMapLocation, GrSatellite } from 'react-icons/all';
import { setMapType } from '../../util/map/mapControl';

const StyledMapTypeControlDiv = styled.div`
    display: flex;
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 130px;
    height: 30px;
    margin: 0;
    padding: 0;
    overflow: hidden;
    z-index: 10;

    border: 1px solid #919191;
    border-radius: 5px;

    span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 65px;
        height: 30px;
        cursor: pointer;

        svg {
            flex: 1;
            font-size: 22px;
        }
    }

    .btn {
        background: #fff;
        background: linear-gradient(#fff, #e6e6e6);

        &:hover {
            background: #f5f5f5;
            background: linear-gradient(#f5f5f5, #e3e3e3);
        }

        &:active {
            background: #e6e6e6;
            background: linear-gradient(#e6e6e6, #fff);
        }
    }

    .selected_btn {
        background: #40a9ff;

        //&:hover {
        //    color: #fff;
        //}
    }
`;

const KakaoMapTypeControl = () => {
    const { map: kakaoMap } = useSelector((state) => ({
        map: state.mapSetting.map,
    }));

    const [roadmapCls, setRoadmapCls] = useState('selected_btn');
    const [skyviewCls, setSkyviewCls] = useState('btn');

    // 지도타입 컨트롤의 지도 또는 스카이뷰 버튼을 클릭하면 호출되어 지도타입을 바꾸는 함수입니다
    const changeMapType = (maptype) => {
        setMapType(kakaoMap, maptype);
        if (maptype === 'roadmap') {
            setRoadmapCls('selected_btn');
            setSkyviewCls('btn');
        } else {
            setRoadmapCls('btn');
            setSkyviewCls('selected_btn');
        }
    };

    return (
        <>
            <StyledMapTypeControlDiv>
                <span
                    className={roadmapCls}
                    onClick={() => changeMapType('roadmap')}
                >
                    <GrMapLocation />
                </span>
                <span
                    className={skyviewCls}
                    onClick={() => changeMapType('skyview')}
                >
                    <GrSatellite />
                </span>
            </StyledMapTypeControlDiv>
        </>
    );
};

export default KakaoMapTypeControl;
