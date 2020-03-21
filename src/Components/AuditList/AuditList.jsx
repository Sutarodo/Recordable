import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactList from "react-list";
import { makeStyles } from "@material-ui/styles"
import { Scrollbars } from "react-custom-scrollbars";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Audit from "../Audit/Audit";
import AuditShape from "../../Shapes/AuditShape"
import ClearAudits from "../../Store/Audit/AuditActions/ClearAudits"

const useStyles = makeStyles({
    root: {
        height: "40vh"
    }
})

const AuditList = ({ audits, clearTheseAudits }) => {
    const classes = useStyles();
    return (
        <>
            <ListSubheader>
                <span>
                    Your Audits ({audits.length})
                    {audits.length > 250 && <strong> -  Warning: High Memory Usage</strong>}
                </span>
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        onClick={clearTheseAudits}

                    >
                        <CloseIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListSubheader>
            <Divider />
            <Paper elevation={5} className={classes.root}>
                <Scrollbars autoHide>
                    <ReactList
                        itemRenderer={(index, key) => <Audit key={key} audit={audits[index]} />}
                        length={audits.length}
                        type="uniform"
                    />
                </Scrollbars>
            </Paper>
        </>
    );
}

AuditList.propTypes = {
    actions: PropTypes.arrayOf(AuditShape),
    clearTheseAudits: PropTypes.func,
};

AuditList.defaultProps = {
    audits: [],
    clearTheseAudits: () => { }
}

const mapStateToProps = ({ auditState: { audits } }) => ({ audits });

const mapDispatchToProps = dispatch => ({
    clearTheseAudits: () => dispatch(ClearAudits())
})

export default connect(mapStateToProps, mapDispatchToProps)(AuditList);