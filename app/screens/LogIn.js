import React from 'react';

function LogIn(props) {
    return (
        <View>
            <View>
                <TextInput></TextInput>
                <Text>Email</Text>
            </View>
            <View>
                <TextInput></TextInput>
                <Text>Password</Text>
            </View>
            <Button title='Log In' />
        </View>
    );
}

export default LogIn;