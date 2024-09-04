// KakaoMap.tsx
"use client"
import { useEffect, useRef } from "react";

interface KakaoMapProps {
  address: string;
  houseName: string;
  onLocationChange?: (lat: number, lng: number) => void;
}

export default function KakaoMap({ address, houseName, onLocationChange }: KakaoMapProps) {
  const mapRef = useRef<kakao.maps.Map | null>(null); // 지도 상태를 저장할 ref
  const markerRef = useRef<kakao.maps.Marker | null>(null); // 마커 상태를 저장할 ref

  useEffect(() => {
    const loadKakaoMapScript = () => {
      const kakaoMapScript = document.createElement("script");
      kakaoMapScript.async = true;
      kakaoMapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_APP_JS_KEY}&libraries=services&autoload=false`;

      document.head.appendChild(kakaoMapScript);

      kakaoMapScript.onload = () => {
        if (typeof window !== 'undefined' && window.kakao) {
          kakao.maps.load(() => {
            const mapContainer = document.getElementById("map") as HTMLElement;
            const mapOptions = {
              center: new kakao.maps.LatLng(33.450701, 126.570667),
              level: 3,
            };

            // 지도를 생성하고, ref에 할당합니다.
            mapRef.current = new kakao.maps.Map(mapContainer, mapOptions);

            // 마커를 초기화한 후, 주소가 있으면 주소 검색 및 마커 표시
            if (address) {
              updateMapWithAddress(address, houseName);
            }
          });
        } else {
          console.error("Kakao Maps API is not loaded.");
        }
      };

      kakaoMapScript.onerror = () => {
        console.error('Failed to load Kakao Maps API script.');
      };
    };

    loadKakaoMapScript();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      // 지도가 초기화된 후에 주소가 변경되면 지도 업데이트
      updateMapWithAddress(address, houseName);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, houseName]);

  const updateMapWithAddress = (address: string, houseName: string) => {
    if (!mapRef.current) {
      console.error("Map is not initialized yet.");
      return;
    }

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK && result[0]) {
        const latitude = parseFloat(result[0].y);
        const longitude = parseFloat(result[0].x);
        const coords = new kakao.maps.LatLng(latitude, longitude);

        console.log(`건물의 위경도: ${latitude}, ${longitude}`); // 위경도를 콘솔에 출력
        
        // 마커가 없으면 생성하고, 있으면 위치만 업데이트
        if (!markerRef.current) {
          markerRef.current = new kakao.maps.Marker({
            map: mapRef.current!,
            position: coords,
          });
        } else {
          markerRef.current.setPosition(coords);
        }

        // 인포윈도우 생성 및 표시
        if (mapRef.current && markerRef.current) {
          const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${houseName}</div>`,
          });
          infowindow.open(mapRef.current, markerRef.current);
        }

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        if (mapRef.current) { 
          mapRef.current.setCenter(coords);
        }

        // onLocationChange가 존재할 때만 호출
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
      <div id="map" className="w-[240px] h-[240px]" />
    </div>
  );
}

