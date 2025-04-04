// This component relates with Legend related controls for chart
// The controls include
// 	- show / hide legend
// 	- legend position
// 	- Orientation
// 	- legend item size

import { FormControl, MenuItem, Select, Divider } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
	updateCalendarStyleOptions,
	updateLegendOptions,
} from "../../../redux/ChartPoperties/ChartControlsActions";
import { ChartOptionsProps, ChartOptionsStateProps } from "../CommonInterfaceForChartOptions";
import SliderWithInput from "../SliderWithInput";
import SwitchWithInput from "../SwitchWithInput";
const ChartLegend = ({
	// state
	tabTileProps,
	chartControls,
	chartProperties,

	// dispatch
	updateLegendOption,
	updateCalendarStyleOptions,
}: ChartOptionsProps & {
	updateLegendOption: (propKey: string, option: string, value: any) => void;
	updateCalendarStyleOptions: (propKey: string, option: string, value: any) => void;
}) => {
	var propKey: string = `${tabTileProps.selectedTabId}.${tabTileProps.selectedTileId}`;

	const showLegend: boolean = chartControls.properties[propKey].legendOptions.showLegend;

	const orientation: string =
		chartProperties.properties[propKey].chartType === "calendar"
			? chartControls.properties[propKey].calendarStyleOptions.orientation
			: chartControls.properties[propKey].legendOptions.orientation;

	const setOrient = (item: string) => {
		if (
			chartProperties.properties[propKey].chartType === "calendar" ||
			chartProperties.properties[propKey].chartType === "heatmap"
		) {
			updateCalendarStyleOptions(propKey, "orientation", item);
		} else {
			updateLegendOption(propKey, "orientation", item);
		}
	};
	const orientOption: any[] = [
		{ name: "Horizontal", key: "horizontal" },
		{ name: "Vertical", key: "vertical" },
	];
	const renderOrientation = () => {
		return orientOption.map(item => {
			const isSelected = item.key === orientation;
			return (
				<div
					className={isSelected ? "radioButtonSelected" : "radioButton"}
					onClick={() => setOrient(item.key)}
					key={item.key}
					style={{
						backgroundColor: isSelected? "rgba(224, 224, 224, 1)" : "white",
						cursor: isSelected? "auto" : "pointer",
						fontWeight: isSelected? "600" : "normal",
					}}
				>
					{item.name}
				</div>
			);
		});
	};

	const positions: any[] = [
		{ pos: "Top Left", top: "top", left: "left" },
		{ pos: "Top", top: "top", left: "center" },
		{ pos: "Top Right", top: "top", left: "right" },
		{ pos: "Middle Left", top: "middle", left: "left" },
		{ pos: "Middle", top: "middle", left: "center" },
		{ pos: "Middle Right", top: "middle", left: "right" },
		{ pos: "Bottom Left", top: "bottom", left: "left" },
		{ pos: "Bottom", top: "bottom", left: "center" },
		{ pos: "Bottom Right", top: "bottom", left: "right" },
	];
	const selectedPosition: any = chartControls.properties[propKey].legendOptions.position;

	const updateSelectedPosition = (selectedValue: string) => {
		var positionSelected = positions.filter(pos => pos.pos === selectedValue)[0];

		updateLegendOption(propKey, "position", positionSelected);
	};

	const itemWidthMinMax: any = { min: 5, max: 200, step: 1 };
	const itemHeightMinMax: any = { min: 5, max: 200, step: 1 };
	const itemSpacingMinMax: any = { min: 0, max: 60, step: 1 };

	return (
		<div className="optionsInfo" style={{ overflowX: "hidden" }}>
			<div className="optionDescription" 
			// style={{ padding: "0 6% 5px 4%" }}
			style={{
				paddingLeft: "0.1rem"
			}}
			>
				<label
					htmlFor="enableDisable"
					className="enableDisableLabel"
					style={{ marginRight: "10px" }}
				>
					Show Legend
				</label>
				<SwitchWithInput
					isChecked={showLegend}
					onSwitch={() => {
						updateLegendOption(propKey, "showLegend", !showLegend);
					}}
				/>
			</div>
			{showLegend ? (
				<React.Fragment>
					<div className="optionDescription" style={{ marginTop: "3px", paddingLeft: "0.4rem" }}>Position:</div>
					{selectedPosition?.pos ? (
						<FormControl
							fullWidth
							size="small"
							style={{ fontSize: "12px", borderRadius: "4px", paddingLeft: "4px"}}
						>
							<Select
								label=""
								value={selectedPosition?.pos}
								variant="outlined"
								onChange={e => {
									updateSelectedPosition(e.target.value);
								}}
								sx={{
									fontSize: "12px",
									width: "99%",
									margin: "0 auto 0.5rem auto",
									backgroundColor: "white",
									height: "1.5rem",
									color: "#404040",									
									"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
										borderColor: "#2bb9bb", // Set focused border color
									},									
								}}
								MenuProps={{
									PaperProps: {
										sx: {
											"& .MuiMenuItem-root.Mui-selected": {
												backgroundColor: "rgba(43, 185, 187, 0.1) !important",  // Force background color												
											},
											"& .MuiMenuItem-root.Mui-selected:hover": {
												backgroundColor: "rgba(43, 185, 187, 0.2) !important",  // Change hover state for selected item
											}
										}
									}
								}}
							>
								{positions.map(position => {
									return (
										<MenuItem
											value={position.pos}
											key={position.pos}
											sx={{
												padding: "2px 10px",
												fontSize: "12px",
											}}
										>
											{position.pos}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					) : null}
					{chartProperties.properties[propKey].chartType === "calendar" ||
					chartProperties.properties[propKey].chartType === "heatmap" ? (
						<div className="optionDescription" style={{ padding: "0 6% 5px 4%", marginTop: "3px" }}>
							<label
								htmlFor="enableDisable"
								className="enableDisableLabel"
								style={{ marginRight: "10px", paddingLeft:"0" }}
							>
								Piecewise
							</label>
							<SwitchWithInput
								isChecked={
									chartControls.properties[propKey].calendarStyleOptions.pieceWise
								}
								onSwitch={() => {
									updateCalendarStyleOptions(
										propKey,
										"pieceWise",
										!chartControls.properties[propKey].calendarStyleOptions
											.pieceWise
									);
								}}
							/>
						</div>
					) : null}
					<div className="optionDescription" style={{ marginTop: "3px", paddingLeft: "0.5rem"}}>Orientation:</div>
					<div className="radioButtons">{renderOrientation()}</div>
					<Divider style={{ margin: "10px 0" }} />
					<div className="optionDescription" style={{ paddingLeft: "0.5rem"}}>RESIZE:</div>
					{chartProperties.properties[propKey].chartType === "calendar" ||
					chartProperties.properties[propKey].chartType === "heatmap" ? (
						<>
							{chartControls.properties[propKey].calendarStyleOptions.pieceWise ? (
								<>
									<div className="optionDescription" style={{ paddingLeft: "0.5rem"}}>Item Gap</div>
									<SliderWithInput
										sliderValue={
											chartControls.properties[propKey].legendOptions.itemGap
										}
										sliderMinMax={itemSpacingMinMax}
										percent={true}
										changeValue={(value: number) =>
											updateLegendOption(propKey, "itemGap", value)
										}

									/>
								</>
							) : null}
						</>
					) : (
						<>
							<div className="optionDescription" style={{ paddingLeft: "0.5rem"}}>Item Gap</div>
							<SliderWithInput
								sliderValue={
									chartControls.properties[propKey].legendOptions.itemGap
								}
								sliderMinMax={itemSpacingMinMax}
								changeValue={(value: number) =>
									updateLegendOption(propKey, "itemGap", value)
								}
							/>
						</>
					)}
					{chartProperties.properties[propKey].chartType === "calendar" ||
					chartProperties.properties[propKey].chartType === "heatmap" ? (
						<>
							<div className="optionDescription" style={{ paddingLeft: "0.5rem"}}>Width</div>
							<SliderWithInput
								sliderValue={
									chartControls.properties[propKey].calendarStyleOptions.width
								}
								sliderMinMax={itemWidthMinMax}
								percent={true}
								changeValue={(value: number) =>
									updateCalendarStyleOptions(propKey, "width", value)
								}
							/>
							<div className="optionDescription" style={{ paddingLeft: "0.5rem"}}>Height</div>
							<SliderWithInput
								sliderValue={
									chartControls.properties[propKey].calendarStyleOptions.height
								}
								sliderMinMax={itemHeightMinMax}
								percent={true}
								changeValue={(value: number) =>
									updateCalendarStyleOptions(propKey, "height", value)
								}
							/>
						</>
					) : (
						<>
							<div className="optionDescription" style={{ paddingLeft: "0.5rem"}}>Width</div>
							<SliderWithInput
								sliderValue={
									chartControls.properties[propKey].legendOptions.symbolWidth
								}
								sliderMinMax={itemWidthMinMax}
								percent={true}
								changeValue={(value: number) =>
									updateLegendOption(propKey, "symbolWidth", value)
								}
							/>
							<div className="optionDescription" style={{ paddingLeft: "0.5rem"}}>Height</div>
							<SliderWithInput
								sliderValue={
									chartControls.properties[propKey].legendOptions.symbolHeight
								}
								sliderMinMax={itemHeightMinMax}
								percent={true}
								changeValue={(value: number) =>
									updateLegendOption(propKey, "symbolHeight", value)
								}
							/>
						</>
					)}
				</React.Fragment>
			) : null}
		</div>
	);
};

const mapStateToProps = (state: ChartOptionsStateProps, ownprops: any) => {
	return {
		chartControls: state.chartControls,
		tabTileProps: state.tabTileProps,
		chartProperties: state.chartProperties,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		updateLegendOption: (propKey: string, option: string, value: any) =>
			dispatch(updateLegendOptions(propKey, option, value)),
		updateCalendarStyleOptions: (propKey: string, option: string, value: any) =>
			dispatch(updateCalendarStyleOptions(propKey, option, value)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartLegend);
