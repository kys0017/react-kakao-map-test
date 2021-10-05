import React from 'react';
import { Radio } from 'antd';
import { BsBookmark, BsList } from 'react-icons/all';

function SearchBoxRadioButton({ onClickRadioButton }) {
    return (
        <Radio.Group
            size="large"
            defaultValue="result"
            onChange={onClickRadioButton}
            style={{ display: 'inline-flex' }}
        >
            <Radio.Button
                value="result"
                style={{
                    width: '100%',
                    textAlign: 'center',
                }}
            >
                <BsList
                    style={{
                        width: '1.2rem',
                        height: '1.2rem',
                        verticalAlign: 'middle',
                    }}
                />{' '}
                검색결과
            </Radio.Button>
            <Radio.Button
                value="bookmark"
                style={{
                    width: '100%',
                    textAlign: 'center',
                }}
            >
                <BsBookmark
                    style={{
                        width: '1.2rem',
                        height: '1.2rem',
                        verticalAlign: 'middle',
                    }}
                />{' '}
                북마크
            </Radio.Button>
        </Radio.Group>
    );
}

export default SearchBoxRadioButton;
