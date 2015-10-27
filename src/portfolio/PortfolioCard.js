import React from 'react';
import { Modal } from '../_common';
import PortfolioTable from './PortfolioTable';
import ContractDetailsCard from '../contract-details/ContractDetailsCard';


const PortfolioCard = ({compact, portfolio, actions}) => {
	const contractShown = portfolio.get('contractShown');
	const proposalShown = contractShown && portfolio.get('proposals').get(contractShown.contract_id);

	return (
		<div>
			<Modal shown={portfolio.get('areDetailsShown')}
				onClose={() => actions.detailsForContract(false)}>
				<ContractDetailsCard contract={contractShown} proposal={proposalShown} />
			</Modal>
			<PortfolioTable
				compact={compact}
				contracts={portfolio.get('contracts')}
				proposals={portfolio.get('proposals')}
				history={history}
				onViewDetails={contract => actions.detailsForContract(true, contract)} />
		</div>
	);
};

PortfolioCard.propTypes = {
	compact: React.PropTypes.bool,
	portfolio: React.PropTypes.object,
	dispatch: React.PropTypes.func,
};

export default PortfolioCard;