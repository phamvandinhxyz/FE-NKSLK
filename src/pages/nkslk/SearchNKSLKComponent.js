import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
import { styled } from '@mui/material/styles';
import {
    Box,
    Toolbar,
    Tooltip,
    IconButton,
    Typography,
    OutlinedInput,
    InputAdornment, TextField
} from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import React, {useState} from "react";
import axios from "axios";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${theme.palette.grey[500_32]} !important`
    }
}));

// ----------------------------------------------------------------------

SearchNKSLKComponent.propTypes = {
    numSelected: PropTypes.number,
    filterName: PropTypes.string,
    onFilterName: PropTypes.func
};

export default function SearchNKSLKComponent({ numSelected, filterName, onFilterName, onSearch, onFilter }) {

    const [keyWord,setKeyWord] = useState('')
    const [filter,setFilter] = useState(0)
    const [timeFilter,setTimeFilter] = useState(null)
    const [viewDatePicker,setViewDatePicker] = useState(["year","month","day"])
    const [formatDatePicker,setFormatDatePicker] = useState("MM/dd/yyyy")

    const onChange = (e) => {
        onSearch(e.target.value)
        setKeyWord(e.target.value)
    }

    const onChangeFilter = (s) => {
        onFilter(filter,s)
        setTimeFilter(s)
    }

    const setYearDatePicker = () => {
        setViewDatePicker(["year"])
        setFormatDatePicker("yyyy")
    }

    const setMonthDatePicker = () => {
        setViewDatePicker(["year","month"])
        setFormatDatePicker("MM/yyyy")
    }

    const setDayDatePicker = () => {
        setViewDatePicker(["year","month","day"])
        setFormatDatePicker("MM/dd/yyyy")
    }

    function convertToDateSql(date){
        return new Date(date).toISOString().split('T')[0]
    };


    return (
        <RootStyle
            sx={{
                ...(numSelected > 0 && {
                    color: 'primary.main',
                    bgcolor: 'primary.lighter'
                })
            }}
        >
            {numSelected > 0 ? (
                <Typography component="div" variant="subtitle1">
                    {numSelected} selected
                </Typography>
            ) : (
                <SearchStyle
                    value={keyWord}
                    onChange={(e)=>{onChange(e)}}
                    placeholder="Search ..."
                    startAdornment={
                        <InputAdornment position="start">
                            <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
                        </InputAdornment>
                    }
                />
            )}

            <Stack spacing={2} direction="row">
                <Button variant="contained" disabled={ filter === 3 || false } onClick={()=>{setYearDatePicker();setFilter(3)}}>N??m</Button>
                <Button variant="contained" disabled={ filter === 2 || false } onClick={()=>{setMonthDatePicker();setFilter(2)}}>Th??ng</Button>
                <Button variant="contained" disabled={ filter === 1 || false } onClick={()=>{setDayDatePicker();setFilter(1)}}>Tu???n</Button>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        disabled={ filter === 0 || false }
                        label="Ng??y th???c hi???n kho??n"
                        value={timeFilter}
                        inputFormat={formatDatePicker}
                        views={viewDatePicker}
                        onChange={(newValue) => {
                            onChangeFilter(convertToDateSql(newValue))
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>


                <Button variant="contained" onClick={()=>{setDayDatePicker();setFilter(0);setTimeFilter(null)}}>Hu???</Button>
            </Stack>

        </RootStyle>
    );
}
