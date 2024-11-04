import {Box, IconButton, Pagination, PaginationItem, Typography} from '@mui/material';
import {ReactComponent as LeftArrowIcon} from '../assets/icons/slider_arrow_left.svg';
import {ReactComponent as RightArrowIcon} from '../assets/icons/slider_arrow_right.svg';
import {styled} from "@mui/system";

// Styled Box for white circle background around arrows
const ArrowButton = styled(IconButton)({
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
});


function CustomPagination({count, page, onChange}) {


    return (

            <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                {/* Custom Left Arrow with Persistent Circular Background */}
                <ArrowButton
                    onClick={() => onChange(null, Math.max(page - 1, 1))}
                    aria-label="Previous page"
                    sx={{marginRight: "36px"}}
                >
                    <LeftArrowIcon/>
                </ArrowButton>

                {page > 1 && (
                    <>
                        {/* Left dashes if not on the first page */}
                        <Typography sx={{
                            color: '#1D1D1D',
                            fontFamily: 'Helvetica',
                            fontSize: '16px',
                            fontWeight: 400,
                            lineHeight: '120%',
                            letterSpacing: '1px',
                        }}>
                            -
                        </Typography>
                        <Typography sx={{
                            color: '#1D1D1D',
                            fontFamily: 'Helvetica',
                            fontSize: '16px',
                            fontWeight: 400,
                            lineHeight: '120%',
                            letterSpacing: '1px',
                        }}>
                            -
                        </Typography>
                    </>
                )}

                {/* Show only the active page number with custom styling */}
                <Pagination
                    count={count}
                    page={page}
                    onChange={onChange}
                    renderItem={(item) =>
                        item.page === page ? (
                            <PaginationItem
                                {...item}
                                sx={{
                                    backgroundColor: 'transparent', // Remove default circle background
                                    color: '#1D1D1D',
                                    fontFamily: 'Helvetica',
                                    fontSize: '16px',
                                    fontWeight: 400,
                                    lineHeight: '120%',
                                    letterSpacing: '1px',
                                }}
                            />
                        ) : null // Hide other items
                    }
                />

                {page < count && (
                    <>
                        {/* Right dashes if not on the last page */}
                        <Typography sx={{
                            color: '#1D1D1D',
                            fontFamily: 'Helvetica',
                            fontSize: '16px',
                            fontWeight: 400,
                            lineHeight: '120%',
                            letterSpacing: '1px',
                        }}>
                            -
                        </Typography>
                        <Typography sx={{
                            color: '#1D1D1D',
                            fontFamily: 'Helvetica',
                            fontSize: '16px',
                            fontWeight: 400,
                            lineHeight: '120%',
                            letterSpacing: '1px',
                        }}>
                            -
                        </Typography>
                    </>
                )}

                {/* Custom Right Arrow with Persistent Circular Background */}
                <ArrowButton
                    onClick={() => onChange(null, Math.min(page + 1, count))}
                    aria-label="Next page"
                    sx={{marginLeft: "36px"}}
                >
                    <RightArrowIcon/>
                </ArrowButton>
            </Box>
    );
}

export default CustomPagination;
