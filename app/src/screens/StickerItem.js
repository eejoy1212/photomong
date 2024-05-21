import useImage from "use-image";
import React, { useState, useEffect, useRef } from "react";
import { Image as KonvaImage, Group, Rect, Transformer, Layer, Shape } from 'react-konva';
import { useHoverDirty, useLongPress } from 'react-use';
import cancelImage from "../assets/Sticker/items/cancel.png";
import scaleImage from "../assets/Sticker/items/scale.png";

export const StickerItem = ({
  setStickerDrag,
  shapeProps, isSelected, onChange,onSelect,image, onDelete, onDragEnd,onResize }) => {
    const imageRef = useRef(null);
    const isHovered = useHoverDirty(imageRef);
    const [stickerImage] = useImage(image.src);
    const [deleteImage] = useImage(cancelImage);
    const [resizeImgae] = useImage(scaleImage);
    const [showDeleteButton, setShowDeleteButton] = useState(false);    

    // const shapeRef = useRef();    
    const trRef = useRef();    

    useEffect(() => {
        if (isSelected) {
          // we need to attach transformer manually
          console.log("스티커 셀렉")
          // setStickerMoving(true)
          trRef.current.nodes([imageRef.current]);
          trRef.current.getLayer().batchDraw();
        }
      }, [isSelected]);
    const onLongPress = () => {
      // setStickerDrag(true)
      // setStickerDrag(true)
      console.log("스티커 드래그중")
        setShowDeleteButton(true);
    }

    image.resetButtonRef.current = () => {
        setShowDeleteButton(false);
       
    }

    const longPressEvent = useLongPress(onLongPress, {
      
        delay: 200
    });
    const [isDragging, setIsDragging] = useState(false);

    const stickerWidth = image.width;
    const stickerHeight = stickerImage ? (image.width * stickerImage.height) / stickerImage.width : 0;

    useEffect(() => {
        if (isHovered) {
            setShowDeleteButton(true);
        } else {
            setTimeout(() => {
                setShowDeleteButton(false);
            }, 2000);
        }
    }, [isHovered]);
console.log("이미지에 아이디?",image)

    return (
        <Group
        
        // ref={shapeRef}
        onClick={onSelect}
        onTap={onSelect}
            draggable
            x={image.x}
            y={image.y}
            
            onDragStart={()=>{
              setStickerDrag(true)
              // setIsDown(false)
              console.log("스티커 드래그 시작")}}
            // onClick={}
            width={image.width}
            onMouseEnter={()=>{console.log("스티커에 마우스 올림")}}
            // onDragStart={() => setIsDragging(true)}
            onDragEnd={(event) => {
              setStickerDrag(false)
              console.log("스티커 드래그 끝")
                //  onChange({
                //     ...shapeProps,
                //     x: event.target.x(),
                //     y: event.target.y(),
                //   });
                //   setIsDragging(false);
                // onDragEnd(event);
               
            }}
            onTransformEnd={(e) => {
              
                // transformer is changing scale of the node
                // and NOT its width or height
                // but in the store we have only width and height
                // to match the data better we will reset scale on transform end
                const node = imageRef.current;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();
      
                // we will reset it back
                node.scaleX(1);
                node.scaleY(1);
                onChange({
                  ...image,
                  x: node.x(),
                  y: node.y(),
                  // set minimal value
                  width: Math.max(5, node.width() * scaleX),
                  height: Math.max(node.height() * scaleY),
                });
              }}
        >
            
            <KonvaImage
            
                ref={imageRef}
                // ref={shapeRef}
                width={image.width}
                height={stickerHeight}
                image={stickerImage}
                {...longPressEvent}
                {...stickerImage}    
                
            />   
               
            {/* {showDeleteButton && !isDragging && ( */}
                <KonvaImage
                
                    onTouchStart={onDelete}
                    onClick={onDelete}
                    image={deleteImage}
                    width={25}
                    height={25}
                    offsetY={stickerHeight/ 2 - 25 - 16.5}
                    offsetX={-stickerWidth / 2 - 50 + 16.5}
                />
            {/* // )} */}
            {/* {showDeleteButton && !isDragging && ( */}
                {/* <KonvaImage
            //    onClick={onSelect}
            //    onTap={onSelect}
                    image={resizeImgae}
                    width={25}
                    height={25}
                    offsetY={-stickerHeight/ 2 - 25 - 16.5}
                    offsetX={stickerWidth / 2 - 25 - 16.5}
                /> */}
                   {isSelected && (
        <Transformer
        keepRatio={true}
       
          ref={trRef}
        //  anchorStroke="transparent"
          enabledAnchors={[ 'bottom-left']}
        //  anchorSize={0}
        // anchorFill="none"
        borderDash={[6,6]}
        // enabledAnchors={false}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 25 || Math.abs(newBox.height) < 25) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
                
            {/* )} */}
        </Group>
    )
}