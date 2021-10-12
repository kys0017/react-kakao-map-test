import React, { useMemo, useState } from 'react';
import { AutoComplete, Card, Input } from 'antd';
import {
    AiOutlineClose,
    AiOutlineLoading3Quarters,
    AiOutlineSearch,
} from 'react-icons/ai';

const AiOutlineLoading3QuartersSpin = () => (
    <AiOutlineLoading3Quarters
        style={{
            width: '1.2rem',
            height: '1.2rem',
            animationName: 'rotate',
            animationDuration: '1s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
        }}
    />
);

function SearchBoxInput({
    query,
    options,
    onChange,
    onSelect,
    onKeyDown,
    onReset,
}) {
    const [suffix, setSuffix] = useState(<AiOutlineSearch />);

    const onChangeValue = (value) => {
        setSuffix(<AiOutlineLoading3QuartersSpin />);
        onChange(value);
    };

    const onSelectValue = (selected, option) => {
        onSelect(selected, option);
        setSuffix(<AiOutlineClose onClick={onResetValue} />);
    };

    const onResetValue = () => {
        onReset();
        setSuffix(<AiOutlineSearch />);
    };

    useMemo(() => {
        setSuffix(
            options.length > 0 ? (
                <AiOutlineClose onClick={onResetValue} />
            ) : (
                <AiOutlineSearch />
            )
        );
    }, [options]);

    return (
        <Card
            size="small"
            title="REACT-KAKAO-MAP-TEST"
            style={{ borderRadius: '10px 10px 0 0' }}
            headStyle={{
                backgroundColor: 'gray',
                color: '#fff',
                borderRadius: '10px 10px 0 0',
            }}
        >
            <AutoComplete
                value={query}
                options={options}
                onChange={onChangeValue}
                onSelect={onSelectValue}
                style={{
                    width: '100%',
                }}
            >
                <Input suffix={suffix} size="large" onKeyDown={onKeyDown} />
            </AutoComplete>
        </Card>
    );
}

export default SearchBoxInput;
