// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;


contract StorePermissions {
    /**
     * @dev Mapping from user address to a JSON string.
     */
    mapping(address => string) private userJsonData;

    /**
     * @dev Emitted whenever a user's JSON data is set or updated.
     * @param user The address whose data was stored.
     * @param jsonData The raw JSON string that was set.
     */
    event UserJSONSet(address indexed user, string jsonData);

    /**
     * @notice Store (or update) JSON data for a given user address.
     * @param _user The address for which we're setting the JSON data.
     * @param _jsonString The raw JSON text (e.g., {"address":"xyz","permissions":"enabled","timestamp":"12345"}).
     */
    function setUserData(address _user, string calldata _jsonString) external {
        // Store the JSON string in the mapping
        userJsonData[_user] = _jsonString;

        // Emit event to record the change
        emit UserJSONSet(_user, _jsonString);
    }

    /**
     * @notice Retrieve the JSON data stored for a user.
     * @param _user The address whose JSON data is being requested.
     * @return The raw JSON string for that user.
     */
    function getUserData(address _user) external view returns (string memory) {
        return userJsonData[_user];
    }
}
