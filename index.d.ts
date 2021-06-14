//Empty file to make typscript happy
/** Simple KeyMap for a Hotkey */
declare interface KeyMap {
	/** The key code to be listned for */
	key: string | String;
	/** Does the Alt key need to be pressed at the same time? */
	alt: boolean;
	/** Does the Ctrl key need to be pressed at the same time? */
	ctrl: boolean;
	/** Does the Shift key need to be pressed at the same time? */
	shift: boolean;
}

/** Hotkey Configuration Registration */
declare interface HotkeySetting {
	/** optional: Group to be included in with their own header. Default: General Group */
	group?: string | String;
	/** Unique variable name to be used in the layout. Recommend: 'module-name.myHotkey' */
	name: string | String;
	/** Label to be displayed in the layout. This will be localized when injected into the HTML */
	label: string | String;
	/**
	* Accept repeated KeyDown events, this occurs if the user is holding the key down, it will
	* send additional events that are spaced out according to the user's key press repeat settings.
	*/
	repeat?: boolean;
	/** The default setting for this hotkey, can be a static KeyMap, or a function that returns the default. */
	default: KeyMap | (() => KeyMap);
	/** Function for retrieving the current hotkey setting. If defined, you must also provide a `set` function. */
	get?(): KeyMap;
	/** Function for saving the new hotkey setting. If defined, you must also provide a `get` function */
	set?(value: KeyMap): Promise<KeyMap>;
	/** Function to handle the execution of the hotkey */
	/** @deprecated Use HotkeySetting.onKeyDown and HotkeySetting.onKeyUp */
	handle?(self: HotkeySetting): void;
	/**
	* Function to handle the execution of the Hot Key Down event.
	* @param self Convenience reference to this HotkeySetting object
	* @param repeated	Optional: This will only be defined if `repeat: true` has been set.
	* 					It will be false on the first Key Down event, but true on any subsequent
	* 					Key Down events caused by the user holding the key down.
	*/
	onKeyDown?(self: HotkeySetting, repeated?: boolean): void;
	/**
	* Function to handle the execution of the Hot Key Up event.
	* @param self Convenience reference to this HotkeySetting object
	*/
	onKeyUp?(self: HotkeySetting): void;
}

/** Hotkey Group Configuration */
declare interface HotkeyGroup {
	/** Unique name of the group. */
	name: string | String;
	/** Displayed in the HTML header for the group. */
	label: string | String;
	/** Optional description of the group */
	description?: string | String;
}