import './MedListTable.scss'

import React from 'react';

import doseTypesData from '../../../helpers/data/doseTypesData';
import { Link } from 'react-router-dom';
import Moment from 'moment';

class MedListTable extends React.Component {
    state = {
        doseType: '',
        collapseState: "collapse"
    }

    componentDidMount = () => {
        const { med } = this.props;
        const typeId = med.doseTypeId;
        doseTypesData.getSingleDoseType(typeId)
            .then((dose) => {
                this.setState({ doseType: dose.description })
            })
    };

    toggle = () => {
        if (this.state.collapseState === "collapse") {
            this.setState({ collapseState: "collapse show" })
        } else {
            this.setState({ collapseState: "collapse" })
        }
    }

    render() {
        const { med } = this.props;
        const historyLink = `/history/${med.id}`;
        const editLink = `/editMed/${med.id}`;
        const medEndDate = Moment(med.endDate).format('MM/DD/YYYY');
        const medFreq = (hours) => {
            if (hours <= 23.9) {
                return hours + " hour(s)";
            } else if (hours >= 24 && hours < 168) {
                return hours / 24 + " day(s)"
            } else if (hours >= 168 && hours < 730) {
                return hours / 168 + " week(s)";
            } else if (hours >= 730) {
                return hours / 730 + " month(s)";
            } else {
                return hours + " hour(s)";
            }
        };

        if (med) {
            return (
                <>
                    <tr>
                        <td className="text-left">{med.name}</td>
                        <td className="text-right"><button className="btn btn-block bg-transparent shadow-none" onClick={this.toggle} block><i class="fas fa-chevron-down"></i></button></td>
                    </tr>
                    <tr className={`font-small-custom font-olive ${this.state.collapseState}`}>
                        <td>{med.doseAmount} {this.state.doseType} every {medFreq(med.hoursBetweenDoses)}</td>
                        <td>exp: {medEndDate}</td>
                    </tr>
                    <tr className={`font-small-custom ${this.state.collapseState}`}>
                        <td><Link className="font-cerulean" to={historyLink}>View History</Link></td>
                        <td><Link className="font-salmon" to={editLink}>Edit Details</Link></td>
                    </tr>
                </>
            )

        } else {
            return (
                <h4>This pet has no medications.</h4>
            );
        }
    }
}

export default MedListTable;