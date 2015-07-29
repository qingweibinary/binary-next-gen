import React from 'react';
import DailyPricesFilter from './DailyPricesFilter';
import DailyPricesTable from './DailyPricesTable';

export default class DailyPricesPage extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div>
				<DailyPricesFilter />
				<DailyPricesTable />
			</div>
		);
	}
}