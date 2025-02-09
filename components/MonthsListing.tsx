import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ListRenderItemInfo,
  Platform,
  Image,
} from "react-native";
import {
  format,
  addMonths,
  startOfMonth,
  isSameMonth,
  differenceInMonths,
  getYear,
} from "date-fns";
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { font_family } from "@/theme/font_family";
import { set_selected_month_year } from "@/redux/slices/user_slice";
import { icons } from "@/data/icon";

interface MonthsListingProps {
  onDateSelect: (date: Date) => void;
}

type MonthGroup = Date[];

const getMonthNumber = (monthStr: string): number => {
  const months = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };
  return months[monthStr as keyof typeof months] || 0;
};

const MonthsListing: React.FC<MonthsListingProps> = ({ onDateSelect }) => {
  const { selected_month, selected_year, creation_month, creation_year } =
    useAppSelector((state) => state.user);
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  const today = new Date();
  const [monthGroups, setMonthGroups] = useState<MonthGroup[]>([]);
  const flatListRef = useRef<FlatList<MonthGroup> | null>(null);
  const initializedRef = useRef<boolean>(false);
  const dispatch = useAppDispatch();
  const [isSelectedMonthVisible, setIsSelectedMonthVisible] = useState(true);

  const generateInitialMonthGroups = (): MonthGroup[] => {
    const result: MonthGroup[] = [];
    const monthNumber = getMonthNumber(creation_month);
    const startDate = startOfMonth(
      new Date(Number(creation_year), monthNumber)
    );
    const endDate = startOfMonth(today);

    // Calculate extra months needed to complete the group containing current month
    const monthsAfterCurrent = 3 - (endDate.getMonth() % 4);
    const adjustedEndDate = addMonths(endDate, monthsAfterCurrent);

    const totalMonths = differenceInMonths(adjustedEndDate, startDate) + 1;

    let currentGroup: Date[] = [];
    for (let i = 0; i < totalMonths; i++) {
      const monthDate = addMonths(startDate, i);
      currentGroup.push(monthDate);

      if (currentGroup.length === 4) {
        result.push([...currentGroup]);
        currentGroup = [];
      }
    }

    // If there are remaining months, pad with future months to complete the group
    if (currentGroup.length > 0) {
      const remainingCount = 4 - currentGroup.length;
      const lastMonth = currentGroup[currentGroup.length - 1];

      for (let i = 1; i <= remainingCount; i++) {
        currentGroup.push(addMonths(lastMonth, i));
      }
      result.push(currentGroup);
    }

    return result;
  };

  const loadMoreFutureMonths = (): void => {
    // Remove this function or keep it empty
  };

  const scrollToSelectedMonth = (): void => {
    const selectedGroupIndex = monthGroups.findIndex((group) =>
      group.some(
        (month) =>
          format(month, "MMM yyyy") === `${selected_month} ${selected_year}`
      )
    );

    if (selectedGroupIndex !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: selectedGroupIndex,
        animated: true,
      });
      setIsSelectedMonthVisible(true);
    }
  };

  const checkIfSelectedMonthVisible = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewWidth = Dimensions.get("window").width;
    const currentIndex = Math.floor(contentOffset / viewWidth);

    const selectedGroupIndex = monthGroups.findIndex((group) =>
      group.some(
        (month) =>
          format(month, "MMM yyyy") === `${selected_month} ${selected_year}`
      )
    );

    setIsSelectedMonthVisible(currentIndex === selectedGroupIndex);
  };

  useEffect(() => {
    if (!initializedRef.current) {
      const initialGroups = generateInitialMonthGroups();
      setMonthGroups(initialGroups);
      initializedRef.current = true;

      setTimeout(() => {
        const selectedGroupIndex = initialGroups.findIndex((group) =>
          group.some(
            (month) =>
              format(month, "MMM yyyy") === `${selected_month} ${selected_year}`
          )
        );

        if (selectedGroupIndex !== -1 && flatListRef.current) {
          flatListRef.current?.scrollToIndex({
            index: selectedGroupIndex,
            animated: false,
          });
        }
      }, 100);
    }
  }, []);

  const renderMonthGroup = ({
    item: group,
  }: ListRenderItemInfo<MonthGroup>): React.ReactElement => (
    <View
      style={{
        flexDirection: "row",
        width: Dimensions.get("window").width,
        justifyContent: "space-around",
        paddingHorizontal: 10,
        alignItems: "center",
        paddingVertical: 10,
      }}
    >
      {group.map((month) => {
        const monthYear = `${format(month, "MMM")} ${getYear(month)}`;
        const creation_month_year = `${creation_month} ${creation_year}`;
        const isSelected = monthYear === `${selected_month} ${selected_year}`;
        const isCurrentMonth = isSameMonth(month, today);
        const isDisabled = !isSameMonth(month, today) && month > today;
        const isCreationMonth = monthYear === creation_month_year;

        return (
          <TouchableOpacity
            key={month.toISOString()}
            disabled={isDisabled}
            style={[
              {
                alignItems: "center",
                padding: 10,
                borderRadius: 8,
                width: Dimensions.get("window").width / 4 - 20,
              },
              isSelected && {
                backgroundColor: colors.foreground,
              },

              isCurrentMonth && {
                borderColor: colors.foreground,
                borderWidth: 1,
              },
              isDisabled && {
                opacity: 0.5,
              },
              isCreationMonth && {
                borderColor: colors.foreground,
                borderWidth: 3,
              },
            ]}
            onPress={() => {
              dispatch(
                set_selected_month_year({
                  selected_month: format(month, "MMM"),
                  selected_year: getYear(month),
                })
              );
              onDateSelect(month);
              setIsSelectedMonthVisible(true);
            }}
          >
            <Text
              style={[
                {
                  color: isSelected
                    ? colors.text
                    : isDisabled
                    ? colors.light_gray
                    : colors.text,
                },
                {
                  fontSize: 16,
                  fontFamily: font_family.font_semibold,
                  color: "white",
                },
              ]}
            >
              {format(month, "MMM")}
            </Text>
            <Text
              style={[
                {
                  color: isSelected
                    ? colors.text
                    : isDisabled
                    ? colors.light_gray
                    : colors.text,
                },
                {
                  fontSize: 12,
                  fontFamily: font_family.font_regular,
                  marginTop: 4,
                  color: "white",
                },
              ]}
            >
              {format(month, "yyyy")}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View>
      <FlatList<MonthGroup>
        ref={flatListRef}
        data={monthGroups}
        renderItem={renderMonthGroup}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onEndReached={loadMoreFutureMonths}
        onEndReachedThreshold={0.5}
        onScroll={checkIfSelectedMonthVisible}
        keyExtractor={(group) => group[0].toISOString()}
        getItemLayout={(_, index) => ({
          length: Dimensions.get("window").width,
          offset: Dimensions.get("window").width * index,
          index,
        })}
      />
      {selected_month && !isSelectedMonthVisible && (
        <TouchableOpacity
          onPress={scrollToSelectedMonth}
          activeOpacity={0.8}
          style={{
            position: "absolute",
            top: 100,
            left: "50%",
            transform: [{ translateX: -80 }],
            zIndex: 10,
            backgroundColor: colors.text,
            borderRadius: 30,
            paddingVertical: Platform.OS === "ios" ? 6 : 6,
            paddingHorizontal: 12,
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={icons.circular_arrow}
            style={{ width: 15, height: 15, marginRight: 5 }}
          />
          <Text
            style={{
              fontFamily: font_family.font_semibold,
              color: colors.background,
              fontSize: 13,
            }}
          >
            Back to selected month
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MonthsListing;
