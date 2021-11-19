import { CircularProgress, Grid } from "@mui/material";

const LoadingStyles = {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column' as 'column',
    height: 'calc(100vh - 64px)',
    justifyContent: 'center'
}

interface Props {
    text: string;
}

export const Loading = ({ text }: Props) => {
    return (
        <Grid style={{ ...LoadingStyles }}>
            <CircularProgress style={{ color: '#071eb3' }} />
            <span style={{ color: '#071eb3', marginTop: 10 }}>Loading {text}</span>
        </Grid>
    )
}
