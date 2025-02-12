// KakaoMap.tsx
"use client"
import { useEffect, useRef } from "react";

interface KakaoMapProps {
  address: string;
  houseName: string;
  width: string;
  height: string;
  onLocationChange?: (lat: number, lng: number) => void;
}

export default function KakaoMap({
  address,
  houseName,
  width = "240px",
  height = "240px",
  onLocationChange,
}: KakaoMapProps) {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const markerRef = useRef<kakao.maps.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null); // div 요소 참조

  useEffect(() => {
    const loadKakaoMapScript = () => {
      const kakaoMapScript = document.createElement("script");
      kakaoMapScript.async = true;
      kakaoMapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_APP_JS_KEY}&libraries=services&autoload=false`;

      document.head.appendChild(kakaoMapScript);

      kakaoMapScript.onload = () => {
        if (typeof window !== "undefined" && window.kakao) {
          kakao.maps.load(() => {
            if (mapContainerRef.current) {
              const mapOptions = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
              };

              mapRef.current = new kakao.maps.Map(mapContainerRef.current, mapOptions);

              setTimeout(() => {
                if (mapRef.current) {
                  kakao.maps.event.trigger(mapRef.current, "resize");
                }
              }, 500);

              if (address) {
                updateMapWithAddress(address, houseName);
              }
            }
          });
        } else {
          console.error("Kakao Maps API is not loaded.");
        }
      };

      kakaoMapScript.onerror = () => {
        console.error("Failed to load Kakao Maps API script.");
      };
    };

    loadKakaoMapScript();
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      updateMapWithAddress(address, houseName);
    }
  }, [address, houseName]);

  //  지도를 주소에 맞게 업데이트
  const updateMapWithAddress = (address: string, houseName: string) => {
    if (!mapRef.current) {
      console.error("Map is not initialized yet.");
      return;
    }

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(houseName, (result, status) => {
      if (status === kakao.maps.services.Status.OK && result[0]) {
        const latitude = parseFloat(result[0].y);
        const longitude = parseFloat(result[0].x);
        const coords = new kakao.maps.LatLng(latitude, longitude);

        console.log(`건물의 위경도: ${latitude}, ${longitude}`);

        if (!markerRef.current) {
          markerRef.current = new kakao.maps.Marker({
            map: mapRef.current!,
            position: coords,
          });
        } else {
          markerRef.current.setPosition(coords);
        }

        if (mapRef.current && markerRef.current) {
          const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${houseName}</div>`,
          });
          infowindow.open(mapRef.current, markerRef.current);
        }

        if (mapRef.current) {
          mapRef.current.setCenter(coords);
        }

        if (onLocationChange) {
          onLocationChange(latitude, longitude);
        }
      } else {
        console.error("Failed to search address:", status);
      }
    });
  };

  return (
    <div>
      <div
        ref={mapContainerRef}
        className="kakao-map"
        style={{ width, height, minWidth: "200px", minHeight: "200px" }}
      />
    </div>
  );
}