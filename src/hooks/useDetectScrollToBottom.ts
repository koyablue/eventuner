import { useEffect, useState, useRef, RefObject, useCallback } from 'react';

/**
 * Detect whether the scroll position reaches the bottom
 *
 * @template T
 * @return {[boolean, RefObject<T>]}
 */
export const useDetectScrollToBottom = <T extends HTMLElement>(): [boolean, RefObject<T>] => {
  const [isBottom, setIsBottom] = useState<boolean>(false);
  const bottomRef = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsBottom(entries[0].isIntersecting);
      },
      {
        root: null,  // ビューポートをルートとして使用
        rootMargin: '0px',  // マージンを設定して検出範囲を調整
        threshold: 1.0  // 監視対象の要素が100%ビューポート内にあるときに通知
      }
    );

    const currentElement = bottomRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return [isBottom, bottomRef];
};
