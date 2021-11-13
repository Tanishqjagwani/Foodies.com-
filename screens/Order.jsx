import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { COLORS, FONTS, icons, SIZES, Google_Api_Key } from "../constant";

export default function Order({ route, navigation }) {
  const [restaurant, setRestaurant] = React.useState(null);
  const [streetName, setStreetName] = React.useState("");
  const [fromLocation, setFromLocation] = React.useState(null);
  const [toLocation, setToLocation] = React.useState(null);
  const [region, setRegion] = React.useState(null);

  React.useEffect(() => {
    let { restaurant, currentLocation } = route.params;
    {
      /*this is wheree we pass from the restaturent screen*/
    }
    let fromLoc = currentLocation.gps;
    let toLoc = restaurant.location;
    let street = currentLocation.streetName;

    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    };
    setRestaurant(restaurant);
    setStreetName(street);
    setFromLocation(fromLoc);
    setToLocation(toLoc);
    setRegion(mapRegion);
  }, []);
  function zoomIn() {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };
    setRegion(newRegion);
  }
  function zoomOut() {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };
    setRegion(newRegion);
  }
  function renderMap() {
    const destinationMarker = () => {
      return (
        <Marker coordinate={toLocation}>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.white,
            }}
          >
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.primary,
              }}
            >
              <Image
                source={icons.pin}
                style={{ height: 25, width: 25, tintColor: COLORS.white }}
              />
            </View>
          </View>
        </Marker>
      );
    };
    const carIcon = () => {
      return (
        <Marker
          coordinate={fromLocation}
          anchor={{ x: 0.5, y: 0.5 }}
          flat={true} /*rotation*/
        >
          <Image source={icons.car} style={{ width: 40, height: 40 }} />
        </Marker>
      );
    };
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
        >
          {destinationMarker()}
          {carIcon()}
        </MapView>
      </View>
    );
  }
  function renderDestinationHeader() {
    return (
      <View
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}
        >
          <Image
            source={icons.red_pin}
            style={{ width: 30, height: 30, marginRight: SIZES.padding }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ ...FONTS.body3 }}>{streetName}</Text>
          </View>
        </View>
      </View>
    );
  }
  function renderDeliveryInfo() {
    return (
      <View
        style={{
          position: "absolute",
          bottom: 50,
          left: 0,
          right: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding * 3,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={restaurant?.courier.avatar}
              style={{ height: 50, width: 50, borderRadius: 25 }}
            />
            <View style={{ flex: 1, marginLeft: SIZES.padding }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ ...FONTS.h4 }}>{restaurant?.courier.name}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={icons.star}
                    style={{
                      width: 18,
                      height: 18,
                      tintColor: COLORS.primary,
                      marginRight: SIZES.padding,
                    }}
                  />
                  <Text style={{ ...FONTS.body3 }}>{restaurant?.rating}</Text>
                </View>
              </View>
              <Text style={{ color: COLORS.darkgray }}>{restaurant?.name}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: SIZES.padding * 2,
            }}
          >
            <TouchableOpacity
              style={{
                height: 50,
                flex: 1,
                marginRight: 10,
                backgroundColor: COLORS.primary,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={{ ...FONTS.h4, color: COLORS.white }}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                marginRight: 10,
                height: 50,

                backgroundColor: COLORS.secondary,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
              onPress={() => navigation.goBack()}
            >
              <Text style={{ ...FONTS.h4, color: COLORS.white }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  function renderButtons() {
    return (
      <View
        style={{
          position: "absolute",
          bottom: SIZES.height * 0.35,
          right: SIZES.padding * 2,
          width: 60,
          height: 130,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.white,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => zoomIn()}
        >
          <Text style={{ ...FONTS.body1 }}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.white,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => zoomOut()}
        >
          <Text style={{ ...FONTS.body1 }}>-</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      {renderMap()}
      {renderDestinationHeader()}
      {renderDeliveryInfo()}
      {renderButtons()}
    </View>
  );
}
