import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import WorkIcon from '@material-ui/icons/WorkOffRounded';
import HomeIcon from '@material-ui/icons/HomeRounded';
import GetAppIcon from '@material-ui/icons/GetAppRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ExtensionRoundedIcon from '@material-ui/icons/ExtensionRounded';
import InfoIcon from '@material-ui/icons/Info';
import TrackChangesRoundedIcon from '@material-ui/icons/TrackChangesRounded';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Link from '@material-ui/core/Link';
import { LinkContainer } from 'react-router-bootstrap';

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
      
    color: theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
    fontSize: '1.23rem'
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: 'opx',
    width: '20rem',
    top: '5rem',
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
    padding: '0 10px'
  },
});

export default function SideMenu() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={['1']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      <LinkContainer to='/' style={{cursor: 'pointer', color:'blue'}}> 
        <StyledTreeItem nodeId="1" labelText="Dashboard" labelIcon={HomeIcon} />
      </LinkContainer>
      <StyledTreeItem nodeId="2" labelText="Task" labelIcon={WorkIcon}>
      <LinkContainer to='/addTask' style={{cursor: 'pointer', color:'#3c8039'}}>
        <StyledTreeItem
            nodeId="9"
            labelText="Add Task"
            labelIcon={LocalOfferIcon}
            color="#3c8039"
            bgColor="#e6f4ea"
          />
        </LinkContainer>
        <LinkContainer to='/allTask' style={{cursor: 'pointer', color:'#3c8039'}}>
          <StyledTreeItem
            nodeId="10"
            labelText="All Tasks"
            labelIcon={LocalOfferIcon}
            labelInfo="733"
            color="#1a73e8"
            bgColor="#e8f0fe"
          />      
      </LinkContainer>
      </StyledTreeItem>
      <StyledTreeItem nodeId="3" labelText="Worker" labelIcon={Label}>
      <LinkContainer to='/workers' style={{cursor: 'pointer', color:'#1a73e8', backgroundColor:'#e8f0fe'}}>
        <StyledTreeItem
          nodeId="5"
          labelText="All Worker"
          labelIcon={SupervisorAccountIcon}
          labelInfo="90"
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
        </LinkContainer>
        <StyledTreeItem
          nodeId="6"
          labelText="Update Worker"
          labelIcon={InfoIcon}
          labelInfo="2,294"
          color="#e3742f"
          bgColor="#fcefe3"
        />
         <LinkContainer to='/add-worker' style={{cursor: 'pointer', color:'#a250f5', backgroundColor:'#f3e8fd'}}>
        <StyledTreeItem
          nodeId="7"
          labelText="Add Worker"
          labelIcon={ForumIcon}
          labelInfo="3,566"
        />
         </LinkContainer>
        <StyledTreeItem
          nodeId="8"
          labelText="Info"
          labelIcon={LocalOfferIcon}
          labelInfo="733"
          color="#3c8039"
          bgColor="#e6f4ea"
        />
      </StyledTreeItem>
      <LinkContainer to='/products' style={{cursor: 'pointer', color:'#a250f5'}}> 
      <StyledTreeItem 
        nodeId="12" 
        labelText="Product" 
        labelIcon={ExtensionRoundedIcon} 
        />
      </LinkContainer>
      <StyledTreeItem nodeId="13" labelText="Shift" labelIcon={TrackChangesRoundedIcon} />
      <StyledTreeItem nodeId="4" labelText="Reports" labelIcon={GetAppIcon} />

    </TreeView>
  );
}
