import React, { PropTypes } from 'react';
import { RadioItem, RadioGroup } from '../_common';
import { typeHasBarrier, digitOptions } from '../_utils/TradeUtils';

const digitOptionsByType = type => {
	switch (type) {
		case 'DIGITOVER': {
			return digitOptions(0, 9);
		}
		case 'DIGITUNDER': {
			return digitOptions(1, 10);
		}
		default: {
			return digitOptions(0, 10);
		}
	}
};

const TradeTypeTickOptions = ({ onTypeChange, onBarrierChange, type, barrier }) => (
	<div>
		<div className="radio-selector">
			<RadioItem
				checked={type === 'CALL'}
				label="Rise"
				name="trade-type"
				value="CALL"
				img="img/trade-rise.svg"
				onChange={onTypeChange}
			/>
			<RadioItem
				checked={type === 'PUT'}
				label="Fall"
				name="trade-type"
				value="PUT"
				img="img/trade-fall.svg"
				onChange={onTypeChange}
			/>
		</div>
		<div className="radio-selector">
			<RadioItem
				checked={type === 'ONETOUCH'}
				label="Touches"
				name="trade-type"
				value="ONETOUCH"
				img="img/trade-touch.svg"
				onChange={onTypeChange}
			/>
			<RadioItem
				checked={type === 'NOTOUCH'}
				label="No Touch"
				name="trade-type"
				value="NOTOUCH"
				img="img/trade-notouch.svg"
				onChange={onTypeChange}
			/>
		</div>
		<div className="radio-selector">
			<RadioItem
				checked={type === 'ASIANU'}
				label="Asian Up"
				name="trade-type"
				value="ASIANU"
				img="img/trade-asianup.svg"
				onChange={onTypeChange}
			/>
			<RadioItem
				checked={type === 'ASIAND'}
				label="Asian Down"
				name="trade-type"
				value="ASIAND"
				img="img/trade-asiandown.svg"
				onChange={onTypeChange}
			/>
		</div>
		<div className="radio-selector">
			<RadioItem
				checked={type === 'RANGE'}
				label="Stay Between"
				name="trade-type"
				value="RANGE"
				img="img/trade-in.svg"
				onChange={onTypeChange}
			/>
			<RadioItem
				checked={type === 'UPORDOWN'}
				label="Goes Outside"
				name="trade-type"
				value="UPORDOWN"
				img="img/trade-outside.svg"
				onChange={onTypeChange}
			/>
		</div>
		<div className="radio-selector">
			<RadioItem
				checked={type === 'EXPIRYMISS'}
				label="Ends Outside"
				name="trade-type"
				value="EXPIRYMISS"
				img="img/trade-out.svg"
				onChange={onTypeChange}
			/>
			<RadioItem
				checked={type === 'EXPIRYRANGE'}
				label="Ends Between"
				name="trade-type"
				value="EXPIRYRANGE"
				img="img/trade-between.svg"
				onChange={onTypeChange}
			/>
		</div>
		<div className="radio-selector">
			<RadioItem
				checked={type === 'DIGITEVEN'}
				label="Digit Even"
				name="trade-type"
				value="DIGITEVEN"
				img="img/trade-digiteven.svg"
				onChange={onTypeChange}
			/>
			<RadioItem
				checked={type === 'DIGITODD'}
				label="Digit Odd"
				name="trade-type"
				value="DIGITODD"
				img="img/trade-digitodd.svg"
				onChange={onTypeChange}
			/>
		</div>
		<div className="radio-selector">
			<RadioItem
				checked={type === 'DIGITMATCH'}
				label="Digit Match"
				name="trade-type"
				value="DIGITMATCH"
				img="img/trade-match.svg"
				onChange={onTypeChange}
			/>
			<RadioItem
				checked={type === 'DIGITDIFF'}
				label="Digit Differs"
				name="trade-type"
				value="DIGITDIFF"
				img="img/trade-differs.svg"
				onChange={onTypeChange}
			/>
		</div>
		<div className="radio-selector">
			<RadioItem
				checked={type === 'DIGITOVER'}
				label="Digit Over"
				name="trade-type"
				value="DIGITOVER"
				img="img/trade-digitover.svg"
				onChange={onTypeChange}
			/>
			<RadioItem
				checked={type === 'DIGITUNDER'}
				label="Digit Under"
				name="trade-type"
				value="DIGITUNDER"
				img="img/trade-digitunder.svg"
				onChange={onTypeChange}
			/>
		</div>
		<div className="radio-selector">
			<RadioItem
				checked={type === 'SPREADU'}
				label="Spread Up"
				name="trade-type"
				value="SPREADU"
				img="img/trade-spread.svg"
				onChange={onTypeChange}
			/>
			<RadioItem
				checked={type === 'SPREADD'}
				label="Spread Down"
				name="trade-type"
				value="SPREADD"
				img="img/trade-spread.svg"
				onChange={onTypeChange}
			/>
		</div>
		{!!typeHasBarrier(type) &&
			<RadioGroup
				label="Last Digit Prediction"
				name="digit-match-differ"
				options={digitOptionsByType(type)}
				onChange={onBarrierChange}
				value={barrier}
			/>
		}
	</div>
);

TradeTypeTickOptions.propTypes = {
	type: PropTypes.string,
	barrier: PropTypes.number,
	onTypeChange: PropTypes.func,
	onBarrierChange: PropTypes.func,
};

export default TradeTypeTickOptions;
